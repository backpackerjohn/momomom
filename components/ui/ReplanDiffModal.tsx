
import React, { useMemo } from 'react';
import { diffMaps, DiffResult, ChunkDiff, SubStepDiff } from '../../services/diff';
import type { MomentumMap } from '../../services/geminiService';
import { CloseIcon } from '../icons';

interface ReplanDiffModalProps {
    oldMap: MomentumMap;
    newMap: MomentumMap;
    onAccept: () => void;
    onCancel: () => void;
}

const getChunkBgColor = (status: ChunkDiff['status']) => {
    switch (status) {
        case 'added': return 'bg-green-50 border-green-200';
        case 'removed': return 'bg-red-50 border-red-200';
        default: return 'bg-white border-gray-200';
    }
};

const getSubStepClass = (status: SubStepDiff['status']) => {
    switch(status) {
        case 'added': return 'text-green-700';
        case 'removed': return 'text-red-700 line-through';
        default: return 'text-text-on-light-muted';
    }
};

const renderChunk = (chunkDiff: ChunkDiff, index: number) => {
    const { status, data, subStepDiffs } = chunkDiff;
    const isModified = status === 'modified';
    const isUnchanged = status === 'unchanged';

    const renderSubSteps = () => {
        if (isModified && subStepDiffs) {
            return subStepDiffs.map((stepDiff, i) => (
                <li key={i} className={`ml-4 list-disc ${getSubStepClass(stepDiff.status)}`}>
                    {stepDiff.data.description} <span className="font-mono text-xs">({stepDiff.data.estimate})</span>
                </li>
            ));
        }
        return data.subSteps.map((step, i) => (
            <li key={i} className="ml-4 list-disc text-text-on-light-muted">
                {step.description} <span className="font-mono text-xs">({step.estimate})</span>
            </li>
        ));
    };

    return (
        <div key={index} className={`p-4 rounded-lg border ${getChunkBgColor(status)}`}>
            <h4 className={`font-bold ${status === 'removed' ? 'line-through' : ''}`}>
                {data.chunkTitle}
                {isModified && <span className="ml-2 text-sm font-normal text-yellow-600">(Modified)</span>}
                {isUnchanged && <span className="ml-2 text-sm font-normal text-gray-400">(Unchanged)</span>}
            </h4>
            <ul className="mt-2 space-y-1 text-sm">
                {renderSubSteps()}
            </ul>
        </div>
    );
};

export const ReplanDiffModal: React.FC<ReplanDiffModalProps> = ({ oldMap, newMap, onAccept, onCancel }) => {
    const diffResult = useMemo(() => diffMaps(oldMap, newMap), [oldMap, newMap]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in-up" style={{ animationDuration: '0.3s'}}>
            <div className="bg-brand-bg w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" role="dialog" aria-modal="true" aria-labelledby="replan-title">
                <header className="p-6 border-b border-light-secondary flex justify-between items-center">
                    <h2 id="replan-title" className="text-2xl font-bold text-text-on-light-primary">Review Your New Plan</h2>
                    <button onClick={onCancel} className="p-2 rounded-full hover:bg-light-secondary" aria-label="Close review">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-6 flex-grow overflow-y-auto space-y-4">
                    <p className="text-text-on-light-muted mb-4">Here are the proposed changes to your map. Locked chunks are preserved.</p>
                    {diffResult.chunks.map((chunkDiff, index) => renderChunk(chunkDiff, index))}
                </main>
                <footer className="p-6 border-t border-light-secondary flex justify-end gap-4">
                    <button onClick={onCancel} className="bg-light-secondary font-semibold px-6 py-2.5 rounded-lg hover:bg-light-primary transition-colors text-text-on-light-muted">
                        Cancel
                    </button>
                    <button onClick={onAccept} className="bg-dark-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-dark-secondary transition-colors">
                        Accept Changes
                    </button>
                </footer>
            </div>
        </div>
    );
};
