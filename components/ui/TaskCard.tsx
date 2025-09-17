import React from 'react';
import { HeartIcon } from '../icons';

export interface TaskData {
    id: number;
    number: number | string;
    title: string;
    subtitle: string;
    details: string;
    color: string;
    dot: string;
}

interface TaskCardProps {
    task: TaskData;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
    <div className={`bg-${task.color} ${task.color === 'accent-primary' ? 'text-white' : 'text-dark-text'} rounded-2xl p-4 flex flex-col justify-between h-40 relative`}>
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${task.color === 'accent-primary' ? 'bg-white/20' : 'bg-black/5'}`}>
                    {task.number}
                </div>
                <div className={`w-3 h-3 rounded-full ${task.dot}`}></div>
            </div>
            <p className="font-bold text-lg">{task.title}</p>
            <p className={`${task.color === 'accent-primary' ? 'text-white/80' : 'text-text-on-light-muted'}`}>{task.subtitle}</p>
        </div>
        <div className="flex items-center justify-between">
            <p className={`text-sm ${task.color === 'accent-primary' ? 'text-white/80' : 'text-text-on-light-muted'}`}>{task.details}</p>
            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${task.color === 'accent-primary' ? 'text-white/80 hover:bg-white/20' : 'text-gray-400 hover:bg-black/10'}`}>
                <HeartIcon />
            </button>
        </div>
    </div>
);
