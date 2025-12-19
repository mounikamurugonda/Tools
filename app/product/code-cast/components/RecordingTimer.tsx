import React from 'react';

interface RecordingTimerProps {
    recordingTime: number;
}

export const RecordingTimer: React.FC<RecordingTimerProps> = ({ recordingTime }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-xs sm:text-sm font-bold tabular-nums">REC {formatTime(recordingTime)}</span>
        </div>
    );
};
