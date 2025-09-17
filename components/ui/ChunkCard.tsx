
import React from 'react';
import { LockIcon, HelpIcon } from '../icons';
import { use3DTilt } from '../hooks/use3DTilt';

interface ChunkCardProps {
    chunk: {
        chunkTitle: string;
        energyTag: 'Low' | 'Medium' | 'High';
        subSteps: {
            description: string;
            estimate: string;
        }[];
    };
    index: number;
    checkedSteps: Record<string, boolean>;
    isLocked: boolean;
    onToggleStep: (key: string) => void;
    onToggleLock: () => void;
    onStuck: () => void;
}

const energyTagStyles = {
    Low: 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20',
    Medium: 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20',
    High: 'bg-pink-100 text-pink-800 ring-1 ring-inset ring-pink-600/20',
};

// New theme definitions
const cardThemes = [
    { // Dark Blue
        card: 'bg-gradient-to-br from-dark-primary to-dark-secondary text-text-on-dark',
        title: 'text-text-on-dark',
        number: 'bg-white/10 text-text-on-dark',
        checkbox: 'text-accent-primary focus:ring-accent-secondary/50 border-gray-500 bg-dark-secondary/50',
        iconButton: 'text-text-on-dark-muted hover:bg-white/10 hover:text-white',
        lockedIcon: 'text-accent-text',
        unlockedIcon: 'text-text-on-dark-muted hover:text-accent-text',
        stepText: 'text-text-on-dark-light',
        stepTextChecked: 'line-through text-text-on-dark-muted/70',
        estimate: 'text-text-on-dark-muted',
        hoverBg: 'group-hover:bg-white/10',
    },
    { // Orange
        card: 'bg-gradient-to-br from-accent-primary to-accent-secondary text-text-on-dark',
        title: 'text-white',
        number: 'bg-white/20 text-white',
        checkbox: 'text-dark-primary focus:ring-dark-primary/50 border-white/50 bg-white/20',
        iconButton: 'text-white/80 hover:bg-white/20 hover:text-white',
        lockedIcon: 'text-white',
        unlockedIcon: 'text-white/80 hover:text-white',
        stepText: 'text-white/90',
        stepTextChecked: 'line-through text-white/60',
        estimate: 'text-white/80',
        hoverBg: 'group-hover:bg-white/10',
    },
    { // Blueish Green
        card: 'bg-gradient-to-br from-secondary-primary to-secondary-secondary text-text-on-light-primary',
        title: 'text-text-on-light-primary',
        number: 'bg-white/40 text-text-on-light-primary',
        checkbox: 'text-accent-primary focus:ring-accent-secondary/50 border-gray-400 bg-white/50',
        iconButton: 'text-text-on-light-muted hover:bg-white/80 hover:text-dark-primary',
        lockedIcon: 'text-dark-primary',
        unlockedIcon: 'text-text-on-light-muted hover:text-dark-primary',
        stepText: 'text-text-on-light-muted',
        stepTextChecked: 'line-through text-text-on-light-muted/60',
        estimate: 'text-text-on-light-muted/90',
        hoverBg: 'group-hover:bg-black/5',
    },
    { // Light Beige
        card: 'bg-gradient-to-br from-light-primary to-light-secondary text-text-on-light-primary',
        title: 'text-text-on-light-primary',
        number: 'bg-white/60 text-text-on-light-primary',
        checkbox: 'text-accent-primary focus:ring-accent-secondary/50 border-gray-400 bg-white/50',
        iconButton: 'text-text-on-light-muted hover:bg-white/80 hover:text-dark-primary',
        lockedIcon: 'text-dark-primary',
        unlockedIcon: 'text-text-on-light-muted hover:text-dark-primary',
        stepText: 'text-text-on-light-muted',
        stepTextChecked: 'line-through text-text-on-light-muted/60',
        estimate: 'text-text-on-light-muted/90',
        hoverBg: 'group-hover:bg-black/5',
    }
];


export const ChunkCard: React.FC<ChunkCardProps> = ({ chunk, index, checkedSteps, isLocked, onToggleStep, onToggleLock, onStuck }) => {
    const theme = cardThemes[index % cardThemes.length];
    const { ref } = use3DTilt();

    const noiseTexture = "before:content-[''] before:absolute before:inset-0 before:bg-[url(data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0_0_800_800'%3E%3Cfilter_id='a'_x='0'_y='0'_width='100%25'_height='100%25'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='.6'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100%25'_height='100%25'_filter='url(%23a)'/%3E%3C/svg%3E)] before:opacity-[0.03] before:pointer-events-none";
    const shimmerEffect = "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full hover:after:translate-x-full focus-within:after:translate-x-full after:transition-transform after:duration-700 after:pointer-events-none";

    return (
        <div ref={ref} className={`rounded-[22px] p-8 sm:p-10 shadow-lg flex flex-col gap-8 transition-all duration-500 [transform-style:preserve-3d] relative overflow-hidden ${theme.card} ${noiseTexture} ${shimmerEffect}`}>
            <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full font-bold text-xl flex items-center justify-center ${theme.number}`}>
                        {index + 1}
                    </div>
                    <h3 className={`font-bold text-3xl ${theme.title}`}>
                        {chunk.chunkTitle}
                    </h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${energyTagStyles[chunk.energyTag]}`}>
                        {chunk.energyTag} Energy
                    </span>
                    <button onClick={onStuck} className={`p-1.5 rounded-full transition-colors ${theme.iconButton}`} aria-label="I'm stuck on this chunk">
                        <HelpIcon />
                    </button>
                     <button onClick={onToggleLock} className={`p-1.5 rounded-full transition-colors ${isLocked ? theme.lockedIcon : theme.unlockedIcon}`} aria-label={isLocked ? 'Unlock this chunk' : 'Lock this chunk'}>
                        <LockIcon locked={isLocked} />
                    </button>
                </div>
            </div>
            <ul className="space-y-8 pl-2 relative z-10">
                {chunk.subSteps.map((step, stepIndex) => {
                    const stepKey = `${index}-${stepIndex}`;
                    const isChecked = checkedSteps[stepKey];

                    return (
                        <li key={stepIndex} className="group">
                            <label
                                htmlFor={`step-${stepKey}`}
                                className={`flex items-start gap-5 p-2 -m-2 rounded-lg cursor-pointer transition-colors duration-200 ${theme.hoverBg}`}
                            >
                                <input
                                    id={`step-${stepKey}`}
                                    type="checkbox"
                                    checked={!!isChecked}
                                    onChange={() => onToggleStep(stepKey)}
                                    className={`form-checkbox h-6 w-6 rounded-md border-2 mt-1 flex-shrink-0 transition ${theme.checkbox}`}
                                    aria-labelledby={`step-text-${stepKey}`}
                                />
                                <span
                                    id={`step-text-${stepKey}`}
                                    className={`flex-grow transition-all duration-300 ${isChecked ? `opacity-50 ${theme.stepTextChecked}` : theme.stepText}`}
                                >
                                    <span className="text-xl font-medium">
                                        {step.description}
                                    </span>
                                    <span className={`font-mono text-base ml-2 ${theme.estimate}`}>
                                        ({step.estimate})
                                    </span>
                                </span>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};
