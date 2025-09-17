


import React, { useState, useEffect } from 'react';
import { generateReplan, type MomentumMap } from '../services/geminiService';
import { ChunkCard, ReplanDiffModal, ImStuckModal } from '../components/ui';
import { FinishLinePanel } from '../components/ui/FinishLinePanel';
import type { GeneratedMapData } from '../App';
import { produce } from 'immer';

interface GeneratedMapPageProps {
  generatedMapData: GeneratedMapData | null;
  navigate: (page: string) => void;
}

const GeneratedMapPage: React.FC<GeneratedMapPageProps> = ({ generatedMapData, navigate }) => {
  const [mapData, setMapData] = useState<GeneratedMapData | null>(generatedMapData);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [lockedChunks, setLockedChunks] = useState<Record<number, boolean>>({});

  // --- Replan State ---
  const [isReplanning, setIsReplanning] = useState(false);
  const [replanError, setReplanError] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState<MomentumMap | null>(null);

  // --- "I'm Stuck" State ---
  const [stuckChunk, setStuckChunk] = useState<{ chunk: MomentumMap['chunks'][0]; index: number } | null>(null);

  useEffect(() => {
    // Reset component state when a new map is loaded
    if (generatedMapData) {
      setMapData(generatedMapData);
      setCheckedSteps({});
      setLockedChunks({});
      setNewPlan(null);
      setIsReplanning(false);
      setStuckChunk(null);
    }
  }, [generatedMapData]);

  const handleToggleStep = (key: string) => {
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleLock = (index: number) => {
    setLockedChunks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleReplan = async () => {
    if (!mapData) return;
    setIsReplanning(true);
    setReplanError(null);
    try {
      const locked = mapData.map.chunks.filter((_, index) => lockedChunks[index]);
      const result = await generateReplan(mapData.goal, locked);
      setNewPlan(result);
    } catch (err) {
      console.error("Replanning failed:", err);
      setReplanError("Sorry, the AI failed to generate a new plan. Please try again.");
    } finally {
      setIsReplanning(false);
    }
  };

  const handleAcceptReplan = () => {
    if (newPlan && mapData) {
      setMapData({ ...mapData, map: newPlan });
      setNewPlan(null);
      setCheckedSteps({}); // Reset progress on new plan
    }
  };

  const handleAddStuckSuggestion = (suggestion: string) => {
    if (!stuckChunk || !mapData) return;

    const newMapData = produce(mapData, draft => {
        const chunkToUpdate = draft.map.chunks[stuckChunk.index];
        chunkToUpdate.subSteps.push({
            description: suggestion,
            estimate: "Just do it"
        });
    });

    setMapData(newMapData);
    setStuckChunk(null);
  };

  if (!mapData) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-40 text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold text-text-on-light-primary">No map generated yet.</h1>
        <p className="mt-4 text-lg text-text-on-light-muted">
          Go ahead and create a new task to build your Momentum Map!
        </p>
        <button
          onClick={() => navigate('newTask')}
          className="mt-8 bg-dark-primary text-text-on-dark font-semibold px-8 py-3 rounded-full hover:bg-dark-secondary transition-colors duration-300 shadow-md transform hover:scale-105 active:scale-100"
        >
          Create New Map
        </button>
      </div>
    );
  }

  const { goal, map } = mapData;
  
  const remainingChunksCount = map.chunks.reduce((count, chunk, chunkIndex) => {
    const isChunkCompleted = chunk.subSteps.every((_, subStepIndex) => !!checkedSteps[`${chunkIndex}-${subStepIndex}`]);
    return isChunkCompleted ? count : count + 1;
  }, 0);


  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="text-center mb-16">
           <h1 className="text-3xl sm:text-4xl font-bold text-text-on-light-primary tracking-tight leading-tight">
                You are only <span className="text-7xl sm:text-8xl text-accent-text underline underline-offset-8 decoration-accent-text/50">{remainingChunksCount}</span> {remainingChunksCount === 1 ? 'step' : 'steps'} away from
            </h1>
            <p className="mt-6 text-4xl sm:text-5xl text-accent-text font-bold max-w-4xl mx-auto">
                "{goal}"
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* --- Left Column: Chunks --- */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {map.chunks.map((chunk, index) => (
              <ChunkCard 
                key={`${chunk.chunkTitle}-${index}`} 
                chunk={chunk} 
                index={index}
                checkedSteps={checkedSteps}
                onToggleStep={handleToggleStep}
                isLocked={!!lockedChunks[index]}
                onToggleLock={() => handleToggleLock(index)}
                onStuck={() => setStuckChunk({ chunk, index })}
              />
            ))}
          </div>

          {/* --- Right Column: Finish Line --- */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
             <FinishLinePanel
                criteria={map.acceptanceCriteria}
                onUpdateCriteria={(newCriteria) => {
                  const newMapData = produce(mapData, draft => {
                    draft.map.acceptanceCriteria = newCriteria;
                  });
                  setMapData(newMapData);
                }}
              />
          </div>
        </div>

        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReplan}
            className="bg-dark-primary text-white font-semibold px-10 py-4 rounded-2xl hover:bg-dark-secondary transition-all duration-300 shadow-lg hover:shadow-black/20 transform hover:scale-105 active:scale-100 text-lg w-full sm:w-auto min-w-[200px]"
            disabled={isReplanning}
          >
            {isReplanning ? 'Replanning...' : 'Replan'}
          </button>
          <button
            onClick={() => navigate('newTask')}
            className="bg-accent-primary text-white font-semibold px-10 py-4 rounded-2xl hover:bg-accent-secondary transition-all duration-300 shadow-lg hover:shadow-accent-primary/40 transform hover:scale-105 active:scale-100 text-lg w-full sm:w-auto"
          >
            Create Another Map
          </button>
        </div>
         {replanError && <p className="text-center text-red-500 mt-4">{replanError}</p>}
      </section>

      {newPlan && (
        <ReplanDiffModal
          oldMap={map}
          newMap={newPlan}
          onAccept={handleAcceptReplan}
          onCancel={() => setNewPlan(null)}
        />
      )}

      {stuckChunk && (
        <ImStuckModal
          goal={goal}
          chunk={stuckChunk.chunk}
          onClose={() => setStuckChunk(null)}
          onAddSuggestion={handleAddStuckSuggestion}
        />
      )}
    </>
  );
};

export default GeneratedMapPage;