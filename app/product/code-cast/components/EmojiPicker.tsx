import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
}

const COMMON_EMOJIS = [
    // Faces
    '😀', '😂', '😎', '🤔', '😍', '👀', '✨', '🔥', '🎉', '🚀',
    '💻', '🌈', '⚡', '💡', '🎨', '📝', '✅', '❌', '❤️', '👍',
    '👻', '🤖', '👾', '🌟', '🎵', '📷', '🌍', '🍕', '☕', '🍺',
    // Abstract
    '💫', '💥', '💢', '💯', '💭', '💬', '📢', '🔔', '🔒', '🔓',
    // Technology
    '📱', '⌨️', '🖱️', '💾', '💿', '🔌', '🔋', '📡', '🕹️', '🧱',
    // Shapes / Colors
    '🔴', '🟢', '🔵', '🟡', '🟣', '⚫', '⚪', '🟤', '🟥', '🟧'
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${isOpen
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                title="Insert Emoji"
            >
                <Smile size={16} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl z-50 grid grid-cols-8 gap-1">
                    {COMMON_EMOJIS.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onEmojiSelect(emoji);
                                setIsOpen(false);
                            }}
                            className="w-6 h-6 flex items-center justify-center text-sm rounded hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
