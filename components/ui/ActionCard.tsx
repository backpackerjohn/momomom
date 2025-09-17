import React from 'react';

export interface ActionCardProps {
    title: string;
    bgColor: string;
    textColor: string;
    icon: React.ReactNode;
}

export const ActionCard: React.FC<ActionCardProps> = ({ title, bgColor, textColor, icon }) => (
    <button className={`${bgColor} ${textColor} rounded-2xl h-40 flex flex-col items-center justify-center p-4 text-center font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary`}>
        {icon}
        <span>{title}</span>
    </button>
);
