'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { GentleLoginModal } from './GentleLoginModal';

interface FeatureGuardProps {
    children: React.ReactNode;
    actionName?: string; // e.g., "record", "export image" - customizable text for the modal
    enabled?: boolean; // Can force disable guard if needed, defaults to true (checking session)
    className?: string; // For wrapper styling if needed
    asChild?: boolean; // If true, clones the child to intercept onClick (avoids wrapping div) - simplistic implementation
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({
    children,
    actionName = 'use this feature',
    enabled = true,
    className = '',
    asChild = false,
}) => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);

    const handleInteraction = (e: React.MouseEvent) => {
        if (enabled && !session) {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(true);
            return;
        }

        // If we wrapped with a div and the child has an onClick, the event bubbles up.
        // If we intercepted it above, we stopped it.
        // If valid, we let it propagate naturally.
    };

    // If user passed a single React Element and wants to avoid a wrapper div (e.g. for layout reasons), 
    // we can clone it. This is trickier if the child is a custom component that doesn't forward onClick properly.
    // For safety and simplicity in this codebase, I'll prefer a wrapper <span> or <div> that captures capture-phase events.

    // Using Capture phase is crucial to stop the event before it reaches the button's own onClick.

    return (
        <>
            <div
                className={className || "contents"} // contents display makes the div disappear from layout flow
                onClickCapture={handleInteraction}
            >
                {children}
            </div>

            <GentleLoginModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                actionName={actionName}
            />
        </>
    );
};
