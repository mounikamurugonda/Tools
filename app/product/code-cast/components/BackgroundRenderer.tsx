
import React from 'react';

interface BackgroundRendererProps {
    background: string;
}

// Helper to get base class for the container
export const getContainerBackgroundClass = (background: string): string => {
    switch (background) {
        case 'codecast-gradient':
            return 'bg-gradient-to-br from-blue-600 to-purple-600';
        case 'aurora-dream':
        case 'zigzag-lightning':
        case 'clean-grid':
        case 'dual-gradient':
        case 'rose-corner':
        case 'diagonal-stripes':
        case 'circuit-board':
            return 'bg-white';
        case 'tropical-dusk':
        case 'crimson-shadow':
            return 'bg-black';
        case 'purple-radial':
            return 'bg-[#020617]';
        default:
            return background;
    }
}

export const BackgroundRenderer: React.FC<BackgroundRendererProps> = ({ background }) => {
    switch (background) {
        case 'aurora-dream':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(175, 109, 255, 0.85), transparent 68%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.75), transparent 68%),
            radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.98), transparent 68%),
            radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.3), transparent 68%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
          `,
                    }}
                />
            );

        case 'zigzag-lightning':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
            repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
            repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
          `,
                    }}
                />
            );

        case 'clean-grid':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
                        backgroundSize: "40px 40px",
                    }}
                />
            );

        case 'tropical-dusk':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 50% 100%, rgba(255, 99, 71, 0.6) 0%, transparent 60%),
              radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.4) 0%, transparent 70%),
              radial-gradient(circle at 50% 100%, rgba(60, 179, 113, 0.3) 0%, transparent 80%)
            `,
                    }}
                />
            );

        case 'purple-radial':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
                    }}
                />
            );

        case 'dual-gradient':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
          `,
                        backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                    }}
                />
            );

        case 'crimson-shadow':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%)",
                    }}
                />
            );

        case 'rose-corner':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
              radial-gradient(circle 600px at 0% 200px, #fda4af, transparent),
              radial-gradient(circle 600px at 100% 200px, #fda4af, transparent)
            `,
                    }}
                />
            );

        case 'diagonal-stripes':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
                    }}
                />
            );

        case 'circuit-board':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
              radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
              radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
            `,
                        backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
                    }}
                />
            );

        default:
            return null;
    }
};
