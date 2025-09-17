
import React, { useState, useEffect } from 'react';
import type { MomentumMap } from '../../services/geminiService';
import { generateStuckSuggestions } from '../../services/geminiService';
import { CloseIcon } from '../icons';

interface ImStuckModalProps {
    goal: string;
    chunk: MomentumMap['chunks'][0];
    onClose: () => void;
    onAddSuggestion: (suggestion: string) => void;
}

export const ImStuckModal: React.FC<ImStuckModalProps> = ({ goal, chunk, onClose, onAddSuggestion }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await generateStuckSuggestions({ goal, chunk });
                setSuggestions(result);
            } catch (err) {
                console.error("Failed to fetch suggestions", err);
                setError("Couldn't get suggestions right now. Maybe take a short break?");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSuggestions();
    }, [goal, chunk]);

    const handleSuggestionClick = (suggestion: string) => {
        onAddSuggestion(suggestion);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in-up" style={{ animationDuration: '0.3s'}}>
            <div className="bg-brand-bg w-full max-w-lg rounded-2xl shadow-2xl flex flex-col p-8" role="dialog" aria-modal="true" aria-labelledby="stuck-title">
                <header className="flex justify-between items-start mb-6">
                    <div>
                        <h2 id="stuck-title" className="text-2xl font-bold text-text-on-light-primary">Feeling Stuck?</h2>
                        <p className="text-text-on-light-muted mt-1">Here are a few ideas to get you moving again.</p>
                    </div>
                    <button onClick={onClose} className="p-2 -mr-2 -mt-2 rounded-full hover:bg-light-secondary" aria-label="Close help modal">
                        <CloseIcon />
                    </button>
                </header>
                <main>
                    {isLoading && (
                        <div className="flex items-center justify-center h-40">
                             <div className="flex items-center justify-center" aria-label="Getting suggestions">
                                <span className="animate-pulse text-text-on-light-muted">Getting suggestions</span>
                                <span className="w-1.5 h-1.5 bg-text-on-light-muted/50 rounded-full mx-1 animate-bounce" style={{animationDelay: '0s'}}></span>
                                <span className="w-1.5 h-1.5 bg-text-on-light-muted/50 rounded-full mx-1 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                <span className="w-1.5 h-1.5 bg-text-on-light-muted/50 rounded-full mx-1 animate-bounce" style={{animationDelay: '0.4s'}}></span>
                            </div>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {!isLoading && !error && (
                        <div className="space-y-3">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full text-left p-4 bg-light-secondary rounded-lg hover:bg-secondary-primary hover:text-text-on-light-strong transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
