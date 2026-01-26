import React, { useRef, useEffect, useState } from 'react';
import { Camera } from 'lucide-react';

interface WebcamOverlayProps {
    enabled: boolean;
    size?: number;
    onClose?: () => void;
}

export const WebcamOverlay: React.FC<WebcamOverlayProps> = ({ enabled, size = 160, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Position state (Draggable) - Initial default position
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let activeStream: MediaStream | null = null;
        let mounted = true;

        const startCamera = async () => {
            setError(null);
            try {
                // Request camera access
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });

                if (!mounted) {
                    mediaStream.getTracks().forEach(track => track.stop());
                    return;
                }

                activeStream = mediaStream;
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                if (mounted) {
                    setError('Camera access denied or unavailable.');
                    console.error('Webcam error:', err);
                }
            }
        };

        if (enabled) {
            startCamera();
        } else {
            setStream(null);
        }

        return () => {
            mounted = false;
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
            setStream(null);
        };
    }, [enabled]);

    // Draggable Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        dragStartRef.current = {
            x: touch.clientX - position.x,
            y: touch.clientY - position.y
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - dragStartRef.current.x,
                y: e.clientY - dragStartRef.current.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            setPosition({
                x: touch.clientX - dragStartRef.current.x,
                y: touch.clientY - dragStartRef.current.y
            });
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging]);


    if (!enabled) return null;

    return (
        <div
            className="absolute z-50 overflow-hidden shadow-2xl ring-4 ring-white/20 dark:ring-black/20 backdrop-blur-sm cursor-move group transition-shadow hover:shadow-xl"
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                top: position.y,
                left: position.x,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Video Stream */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
            />

            {/* Placeholder / Error State */}
            {!stream && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
                    {error ? (
                        <>
                            <Camera size={20} className="mb-1 text-red-400" />
                            <span className="text-[10px] leading-tight font-medium text-red-200">
                                {error}
                            </span>
                        </>
                    ) : (
                        <Camera size={24} className="text-gray-400" />
                    )}
                </div>
            )}
        </div>
    );
};
