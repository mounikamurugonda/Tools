
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
        case 'vector-dots':
            return 'bg-white';
        case 'vector-blueprint':
            return 'bg-[#1e3a8a]';
        case 'abstract-waves':
            return 'bg-[#0f172a]';
        case 'hexati-pattern':
            return 'bg-[#111827]';
        case 'unsplash-desk':
        case 'unsplash-code':
        case 'unsplash-nature':
        case 'unsplash-abstract':
            return 'bg-gray-900';
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



        case 'vector-dots':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(#94a3b8 1.5px, transparent 1.5px)`,
                        backgroundSize: '20px 20px',
                    }}
                />
            );

        case 'vector-blueprint':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none bg-[#1e3a8a]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
                        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
                    }}
                />
            );

        case 'abstract-waves':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none bg-[#0f172a]"
                    style={{
                        backgroundImage: `
              radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(34, 211, 238, 0.15) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(251, 191, 36, 0.15) 0px, transparent 50%)
            `,
                    }}
                />
            );

        case 'hexati-pattern':
            return (
                <div
                    className="absolute inset-0 z-0 pointer-events-none bg-[#111827]"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 100% 50%, transparent 20%, rgba(255,255,255,0.03) 21%, rgba(255,255,255,0.03) 34%, transparent 35%, transparent),
              radial-gradient(circle at 0% 50%, transparent 20%, rgba(255,255,255,0.03) 21%, rgba(255,255,255,0.03) 34%, transparent 35%, transparent)
            `,
                        backgroundSize: '60px 100px',
                        backgroundPosition: '0 0, 30px 50px'
                    }}
                />
            );



        case 'unsplash-desk':
            return (
                <div className="absolute inset-0 z-0 select-none">
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            );

        case 'unsplash-code':
            return (
                <div className="absolute inset-0 z-0 select-none">
                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            );

        case 'unsplash-nature':
            return (
                <div className="absolute inset-0 z-0 select-none">
                    <img
                        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            );

        case 'unsplash-abstract':
            return (
                <div className="absolute inset-0 z-0 select-none">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
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
