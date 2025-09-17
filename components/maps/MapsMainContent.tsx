
import React from 'react';
import { TaskCard } from '../ui';
import type { TaskData } from '../ui/TaskCard';

// Mock data representing saved Momentum Maps
const mockMaps: TaskData[] = [
  { id: 1, number: 'M1', title: 'Launch a Podcast', subtitle: 'Weekly show on vintage synths', details: '9 Chunks', color: 'task-yellow', dot: 'bg-yellow-400' },
  { id: 2, number: 'M2', title: 'Train for 5k Run', subtitle: 'Get ready for the city marathon', details: '6 Chunks', color: 'task-green', dot: 'bg-green-400' },
  { id: 3, number: 'M3', title: 'Learn Next.js', subtitle: 'Build a new portfolio site', details: '8 Chunks', color: 'task-pink', dot: 'bg-pink-400' },
  { id: 4, number: 'M4', title: 'Plan Europe Trip', subtitle: 'Backpacking for 3 weeks', details: '5 Chunks', color: 'task-gray', dot: 'bg-gray-400' },
  { id: 5, number: 'M5', title: 'Write a Novel', subtitle: 'Finish the first draft', details: '12 Chunks', color: 'accent-primary', dot: 'bg-red-400' },
  { id: 6, number: 'M6', title: 'Organize Garage', subtitle: 'Weekend declutter project', details: '4 Chunks', color: 'task-yellow', dot: 'bg-yellow-400' },
];


export const MapsMainContent: React.FC = () => {
    return (
        <main className="col-span-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockMaps.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </main>
    );
};
