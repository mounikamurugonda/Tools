import React, { useState, useEffect } from 'react';
import { X, AudioLines, Sparkles, Loader2 } from 'lucide-react';
import { useAnimateStore, useTypeStore } from '../store/useCodeCastStore';
import { usePathname } from 'next/navigation';
import { generateVoiceoverScript } from '../utils/sarvamAI';

interface VoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (voice: SpeechSynthesisVoice | null, text: string) => void;
    initialVoice?: SpeechSynthesisVoice | null;
    initialText?: string;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialVoice = null,
    initialText = ''
}) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(initialVoice);
    const [speechText, setSpeechText] = useState(initialText);
    const [isGenerating, setIsGenerating] = useState(false);
    const pathname = usePathname();

    // Determine current store to get code
    const animateStore = useAnimateStore();
    const typeStore = useTypeStore();
    const mode = pathname?.includes('/animate') ? 'animate' : 'type';
    const currentStore = mode === 'animate' ? animateStore : typeStore;

    useEffect(() => {
        const loadVoices = () => {
            // ... existing loadVoices logic
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (!selectedVoice && availableVoices.length > 0) {
                const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
                setSelectedVoice(defaultVoice);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Update speechText if initialText changes when reopening
    useEffect(() => {
        if (isOpen) {
            setSpeechText(initialText);
        }
    }, [isOpen, initialText]);


    const handleSave = () => {
        onSave(selectedVoice, speechText);
        onClose();
    };

    const handleTest = () => {
        if (speechText && selectedVoice) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.voice = selectedVoice;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleGenerateVoiceover = async () => {
        if (!currentStore.code.html && !currentStore.code.css) {
            alert("Please add some HTML or CSS code first.");
            return;
        }

        setIsGenerating(true);
        try {
            const script = await generateVoiceoverScript(currentStore.code.html, currentStore.code.css);
            setSpeechText(script);
        } catch (error) {
            console.error("Failed to generate voiceover", error);
            alert("Failed to generate voiceover. Please check your API key.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <AudioLines size={18} className="text-blue-600 dark:text-blue-400" />
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Voice Settings</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Voice Selection */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                            Select Voice
                        </label>
                        <select
                            value={selectedVoice?.name || ''}
                            onChange={(e) => {
                                const voice = voices.find(v => v.name === e.target.value);
                                setSelectedVoice(voice || null);
                            }}
                            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        >
                            {voices.map((voice) => (
                                <option key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Speech Text */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Speech Text
                            </label>

                            <button
                                onClick={handleGenerateVoiceover}
                                disabled={isGenerating}
                                className="flex items-center gap-1.5 text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <Sparkles size={12} />
                                )}
                                <span>Generate with AI</span>
                            </button>
                        </div>
                        <textarea
                            value={speechText}
                            onChange={(e) => setSpeechText(e.target.value)}
                            placeholder="Enter text to speak during recording..."
                            rows={4}
                            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleTest}
                            disabled={!speechText || !selectedVoice}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 rounded-md text-sm font-bold transition-colors"
                        >
                            <AudioLines size={14} />
                            <span>Test Voice</span>
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold py-2 transition-colors shadow-sm shadow-blue-600/20"
                        >
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

