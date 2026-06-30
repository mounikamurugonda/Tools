import React, { useEffect, useState } from 'react';

interface ProjectInfoOverlayProps {
  projectTitle: string;
  isVisible?: boolean;
}

export const ProjectInfoOverlay: React.FC<ProjectInfoOverlayProps> = ({
  projectTitle,
  isVisible = true,
}) => {
  const [show, setShow] = useState(isVisible);

  // Listen to the toggle from sidebar
  useEffect(() => {
    const checkToggle = () => {
      const toggle = document.getElementById('project-info-toggle');
      if (toggle) {
        const shouldShow = toggle.getAttribute('data-show-project-info') === 'true';
        setShow(shouldShow);
      }
    };

    checkToggle();
    const interval = setInterval(checkToggle, 100);
    return () => clearInterval(interval);
  }, []);

  if (!show || !projectTitle) return null;

  return (
    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20 shadow-xl">
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-300 font-semibold">
          Project
        </span>
        <span className="text-xs sm:text-sm font-bold">{projectTitle}</span>
      </div>
    </div>
  );
};
