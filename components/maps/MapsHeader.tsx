
import React from 'react';

interface MapsHeaderProps {
    consistencyStreak: number;
}

export const MapsHeader: React.FC<MapsHeaderProps> = ({ consistencyStreak }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 md:py-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div>
                    <p className="text-3xl sm:text-4xl md:text-5xl text-text-on-light-primary leading-tight">
                        Small <span className="text-accent-text">steps</span> every day <span className="text-accent-text">lead</span>
                        <br />
                        for big <span className="text-accent-text">achievements</span>
                    </p>
                </div>
            </div>
            <div className="text-center md:text-left flex-shrink-0">
                <span className="text-5xl sm:text-6xl font-bold text-text-on-light-primary leading-none">
                    <span className="text-accent-text">{consistencyStreak}</span> days
                </span>
                <p className="text-lg sm:text-xl text-text-on-light-primary mt-1">
                    <span className="text-accent-text">consistent.</span>
                </p>
            </div>
        </div>
    );
};
