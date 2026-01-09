import { useRef, useEffect, useCallback } from 'react';
import type { CodeSnippet, AppConfig } from '../types';

// Convert typing speed to milliseconds
const getTypingSpeedMs = (speed: 'slow' | 'normal' | 'fast' | 'instant') => {
    const speedMap = {
        slow: 100,
        normal: 40,
        fast: 20,
        instant: 10,
    };
    return speedMap[speed];
};

interface UseMultiTabAnimationProps {
    code: CodeSnippet;
    updateCode: (tab: 'html' | 'css' | 'js', content: string) => void;
    config: AppConfig;
    activeTab: 'html' | 'css' | 'js';
    setActiveTab: (tab: 'html' | 'css' | 'js') => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    editorRef: React.MutableRefObject<any>;
}

export const useMultiTabAnimation = ({
    code,
    updateCode,
    config,
    setActiveTab,
    isPlaying,
    setIsPlaying,
    editorRef,
}: UseMultiTabAnimationProps) => {
    // Animation refs
    const animationTimerRef = useRef<number | null>(null);
    const fullBackupRef = useRef(code);
    const typingSpeedRef = useRef(config.typingSpeed);
    const isPlayingRef = useRef(isPlaying);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Sync typing speed ref with config
    useEffect(() => {
        typingSpeedRef.current = config.typingSpeed;
    }, [config.typingSpeed]);

    // Initialize audio
    useEffect(() => {
        // Only create audio if we are in browser environment
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/keyboard-typing.mp3');
            audioRef.current.loop = true;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const stopAnimation = useCallback(() => {
        if (animationTimerRef.current) {
            window.clearTimeout(animationTimerRef.current);
            animationTimerRef.current = null;
        }
        setIsPlaying(false);
    }, [setIsPlaying]);

    // Robust cleanup on unmount or when stopping
    useEffect(() => {
        return () => {
            // Stop timer
            if (animationTimerRef.current) {
                window.clearTimeout(animationTimerRef.current);
            }

            // Stop audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // If playing on unmount, force stop and restore code to prevent data loss or stuck state
            if (isPlayingRef.current) {
                setIsPlaying(false);
                const backup = fullBackupRef.current;
                // Direct state updates to ensure they happen even if component is unmounting
                // This assumes updateCode is stable; using the passed prop.
                // NOTE: In the original code, it accessed store.getState() directly for unmount cleanup.
                // We might want to handle that in the consumer or trust the prop if the store is stable.
                // For safety, we'll try to use the prop, but ideally we'd access the store instance directly if we could.
                // Since we don't have direct store access here without import, we'll rely on the parent or adding logic there.
                // However, standard useEffect cleanup with props works if the component remains mounted long enough for the callback? 
                // No, unmount cleanup runs when component is removed. Props are still accessible in closure.
                updateCode('html', backup.html);
                updateCode('css', backup.css);
                updateCode('js', backup.js);
            }
        };
    }, [setIsPlaying, updateCode]); // Run once on mount/unmount logic handled by refs

    // Trigger animation when isPlaying changes
    useEffect(() => {
        const wasPlaying = isPlayingRef.current;
        isPlayingRef.current = isPlaying;

        // If transitioning from not playing to playing, start animation
        if (!wasPlaying && isPlaying) {
            if (config.soundEnabled && audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            }

            // Capture the target state from current editor content
            // Note: We used 'code' from props. Ensure it's the latest.
            const target = { ...code };
            fullBackupRef.current = target;

            // Clear all code fields first
            updateCode('html', '');
            updateCode('css', '');
            updateCode('js', '');

            const sequence: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
            let sequenceIndex = 0;
            let charIndex = 0;

            const startNextTab = () => {
                // Find next non-empty tab in sequence
                while (sequenceIndex < sequence.length && (!target[sequence[sequenceIndex]] || !target[sequence[sequenceIndex]].trim())) {
                    sequenceIndex++;
                }

                if (sequenceIndex >= sequence.length) {
                    stopAnimation();
                    return;
                }

                const currentTabId = sequence[sequenceIndex];
                setActiveTab(currentTabId);
                charIndex = 0;

                const typeChar = () => {
                    const fullText = target[currentTabId];

                    if (charIndex <= fullText.length) {
                        updateCode(currentTabId, fullText.substring(0, charIndex));

                        // Auto-scroll to keep typing line visible during animation
                        // Use requestAnimationFrame to ensure Monaco has rendered before scrolling
                        requestAnimationFrame(() => {
                            if (editorRef.current) {
                                const model = editorRef.current.getModel();
                                if (model) {
                                    const lineCount = model.getLineCount();
                                    const column = model.getLineMaxColumn(lineCount);
                                    // Use revealPositionInCenter with immediate scroll type for more reliable scrolling
                                    editorRef.current.revealPositionInCenter(
                                        { lineNumber: lineCount, column: column },
                                        0 // scrollType: 0 = Immediate
                                    );
                                }
                            }
                        });

                        charIndex++;
                        animationTimerRef.current = window.setTimeout(typeChar, getTypingSpeedMs(typingSpeedRef.current));
                    } else {
                        // Finished this tab, move to next after a small pause
                        sequenceIndex++;
                        animationTimerRef.current = window.setTimeout(startNextTab, 1000);
                    }
                };

                // Start typing after a small delay
                animationTimerRef.current = window.setTimeout(typeChar, 150);
            };

            // Initial delay
            animationTimerRef.current = window.setTimeout(startNextTab, 300);
        } else if (wasPlaying && !isPlaying) {
            // If transitioning from playing to not playing, stop and restore
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            stopAnimation();
            updateCode('html', fullBackupRef.current.html);
            updateCode('css', fullBackupRef.current.css);
            updateCode('js', fullBackupRef.current.js);
        }
    }, [isPlaying, stopAnimation, updateCode, setActiveTab, config.soundEnabled, editorRef, code]);
    // Actually, 'code' changing *while* playing shouldn't restart. 
    // But we need to capture `code` at the *moment* isPlaying becomes true.
    // The effect runs when isPlaying changes. At that moment, `code` is the valid code.

    // NOTE: If 'code' is in dependencies, any update (e.g. typing) would re-trigger this effect.
    // But we have `if (!wasPlaying && isPlaying)`. 
    // If `isPlaying` is true and `code` updates, `wasPlaying` is true, so it hits the `else if`.
    // `wasPlaying && !isPlaying` would be false (true && false).
    // So standard updates won't trigger restart or stop. Safe.

    const handleAnimate = useCallback(() => {
        if (isPlaying) {
            stopAnimation();
            return;
        }
        setIsPlaying(true);
    }, [isPlaying, stopAnimation, setIsPlaying]);

    return {
        handleAnimate,
        stopAnimation,
    };
};
