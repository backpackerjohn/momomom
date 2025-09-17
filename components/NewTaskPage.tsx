
import React, { useState, useRef } from 'react';
import { use3DTilt } from './hooks/use3DTilt';
import NeuralBackground from './backgrounds/NeuralBackground';
import { generateContentWithRetry, type MomentumMap } from '../services/geminiService';
import type { GeneratedMapData } from '../../App';

const inspirationPrompts = [
  'Launch a weekly podcast',
  'Train for a 5k run',
  'Learn a new programming language',
];

interface NewTaskPageProps {
  setGeneratedMapData: (data: GeneratedMapData) => void;
  navigate: (page: string) => void;
}

const InspirationButton: React.FC<{ prompt: string; onClick: () => void }> = ({ prompt, onClick }) => {
  const { ref } = use3DTilt<HTMLButtonElement>({ max: 10 });

  const noiseTexture = "before:content-[''] before:absolute before:inset-0 before:bg-[url(data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0_0_800_800'%3E%3Cfilter_id='a'_x='0'_y='0'_width='100%25'_height='100%25'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='.6'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100%25'_height='100%25'_filter='url(%23a)'/%3E%3C/svg%3E)] before:opacity-[0.03] before:pointer-events-none";
  const shimmerEffect = "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full hover:after:translate-x-full focus-within:after:translate-x-full after:transition-transform after:duration-700 after:pointer-events-none";
  
  const combinedClasses = [
    'flex items-center justify-center min-h-[44px] px-6 py-3 text-base',
    'bg-dark-secondary text-text-on-dark-light rounded-full',
    'relative overflow-hidden [transform-style:preserve-3d] transform-gpu',
    'transition-all duration-300',
    'hover:bg-dark-primary hover:text-text-on-dark',
    'focus:outline-none focus:ring-2 focus:ring-accent-secondary/50',
    shimmerEffect,
    noiseTexture,
  ].join(' ');

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={combinedClasses}
    >
      <span className="relative z-10">{prompt}</span>
    </button>
  );
};

const NewTaskPage: React.FC<NewTaskPageProps> = ({ setGeneratedMapData, navigate }) => {
  const [goal, setGoal] = useState('');
  type Status = 'idle' | 'loading' | 'error';
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isCancelled = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || status === 'loading') return;

    setStatus('loading');
    setError(null);
    isCancelled.current = false;

    try {
      const result = await generateContentWithRetry(goal);
      
      if (isCancelled.current) {
        console.log("Operation was cancelled by the user.");
        setStatus('idle');
        return;
      }
      
      setGeneratedMapData({ goal, map: result });
      navigate('generated-map');

    } catch (err) {
      if (isCancelled.current) {
        console.log("Operation was cancelled by the user.");
        setStatus('idle');
        return;
      }
      
      console.error('Final error after retries:', err);
      setError('Oops! The AI failed to generate a map. The server might be busy. Please try again in a moment.');
      setStatus('error');
    }
  };

  const handleCancel = () => {
    isCancelled.current = true;
    setStatus('idle');
    setError(null);
  };

  const handlePromptClick = (prompt: string) => {
    setGoal(prompt);
  };
  
  const isLoading = status === 'loading';
  const noiseTexture = "before:content-[''] before:absolute before:inset-0 before:bg-[url(data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0_0_800_800'%3E%3Cfilter_id='a'_x='0'_y='0'_width='100%25'_height='100%25'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='.6'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100%25'_height='100%25'_filter='url(%23a)'/%3E%3C/svg%3E)] before:opacity-[0.03] before:pointer-events-none";

  const sectionClasses = `
    w-11/12 md:w-5/6 lg:w-4/5
    max-w-6xl
    rounded-3xl 
    shadow-2xl hover:shadow-indigo-500/20
    p-8 sm:p-12 md:p-16 
    flex flex-col items-center justify-center text-center 
    transition-all duration-500
    animate-fade-in-up
    py-20 md:py-24
    relative overflow-hidden
    ${isLoading ? 'animate-pulse-aura' : ''}
  `;
  
  const inputClasses = `
    w-full 
    px-6 py-4 
    bg-dark-primary/60
    border-2 
    text-text-on-dark 
    placeholder:text-text-on-dark-muted
    rounded-full 
    focus:ring-2 focus:ring-accent-secondary/50 focus:outline-none 
    transition-all duration-300
    text-lg
    shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${!isFocused && !isLoading ? 'animate-pulse-glow border-dark-secondary' : 'border-accent-secondary'}
  `;

  const buttonClasses = `
    bg-accent-primary text-white font-semibold 
    px-10 py-4 rounded-2xl
    hover:bg-accent-secondary 
    transition-all duration-300 
    shadow-lg hover:shadow-accent-primary/40
    transform hover:scale-105 active:scale-100
    text-lg
    focus:outline-none focus:ring-4 focus:ring-accent-primary/50
    disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    min-h-[64px] w-[200px] flex items-center justify-center
  `;

  return (
    <section 
      aria-labelledby="new-task-title"
      className={sectionClasses}
    >
      <NeuralBackground />
      <div className={`absolute inset-0 z-0 rounded-3xl ${noiseTexture}`} />

      <div className="max-w-3xl w-full flex flex-col items-center relative z-10">
        <h1 id="new-task-title" className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-on-dark tracking-tight">
          Break <span className="text-accent-text">big</span> goals into <span className="text-accent-text">small</span> steps.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-on-dark-muted leading-relaxed max-w-xl mx-auto">
          Build <span className="text-accent-text">Momentum</span> by turning your goal into a clear <span className="text-accent-text">Map</span>.
        </p>
        
        <div className="w-full max-w-2xl mx-auto mt-16">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <label htmlFor="goal-input" className="sr-only">
              What's your big goal?
            </label>
            <input
              id="goal-input"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Launch a weekly podcast about vintage synths"
              aria-label="Your goal input"
              className={inputClasses}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
            />

            {status === 'error' && (
                <div className="mt-4 text-accent-secondary/90 bg-accent-secondary/10 px-4 py-2 rounded-lg text-sm" role="alert">
                    {error}
                </div>
            )}

            <div className="mt-10 flex items-center space-x-4">
              <button
                type="submit"
                className={buttonClasses}
                disabled={isLoading || !goal.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center" aria-label="Building your map">
                    <span className="animate-pulse">Building</span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full mx-1 animate-bounce" style={{animationDelay: '0s'}}></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full mx-1 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full mx-1 animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </span>
                ) : status === 'error' ? (
                  'Retry'
                ) : (
                  'Build My Map'
                )}
              </button>
              {isLoading && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-text-on-dark-muted hover:text-text-on-dark transition-colors font-semibold px-6 py-4 rounded-2xl"
                  >
                    Cancel
                  </button>
              )}
            </div>
          </form>

          <div className="mt-16 text-center">
            <span className="text-text-on-dark-muted text-base">Need inspiration? Try one:</span>
            <div className="flex items-center justify-center gap-4 mt-6">
              {inspirationPrompts.map((prompt) => (
                <InspirationButton
                  key={prompt}
                  prompt={prompt}
                  onClick={() => handlePromptClick(prompt)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTaskPage;
