
import React, { useState, useEffect } from 'react';
import { EditIcon } from '../icons';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

interface FinishLinePanelProps {
    criteria: string[];
    onUpdateCriteria: (newCriteria: string[]) => void;
}

export const FinishLinePanel: React.FC<FinishLinePanelProps> = ({ criteria, onUpdateCriteria }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(criteria.join('\n'));

    useEffect(() => {
        if (!isEditing) {
            setEditText(criteria.join('\n'));
        }
    }, [criteria, isEditing]);

    const handleSave = () => {
        onUpdateCriteria(editText.split('\n').filter(line => line.trim() !== ''));
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setEditText(criteria.join('\n'));
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-text-on-light-primary">The Finish Line</h3>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="p-2 rounded-full text-text-on-light-muted hover:bg-light-secondary hover:text-text-on-light-strong transition-colors"
                        aria-label="Edit acceptance criteria"
                    >
                        <EditIcon />
                    </button>
                )}
            </div>
            <p className="text-sm text-text-on-light-muted mb-6">
                Your goal is complete when you can check off all of these.
            </p>

            {isEditing ? (
                <div>
                    <label htmlFor="criteria-editor" className="sr-only">Acceptance Criteria Editor</label>
                    <textarea 
                        id="criteria-editor"
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-light-secondary/50 border-2 border-light-primary rounded-lg p-3 focus:ring-2 focus:ring-accent-secondary focus:border-accent-secondary transition text-sm text-text-on-light-strong"
                        rows={6}
                        placeholder="Enter each criterion on a new line..."
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button 
                            onClick={handleCancel} 
                            className="px-4 py-2 text-sm font-semibold text-text-on-light-muted hover:bg-light-secondary rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave} 
                            className="px-4 py-2 text-sm font-semibold text-white bg-dark-primary hover:bg-dark-secondary rounded-lg transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <ul className="space-y-3">
                    {criteria.map((item, index) => (
                         <li key={index} className="flex items-start gap-3 text-text-on-light-strong">
                            <CheckCircleIcon className="w-5 h-5 mt-0.5 text-secondary-primary flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
