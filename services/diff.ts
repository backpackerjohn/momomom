
import { MomentumMap } from './geminiService';

type Chunk = MomentumMap['chunks'][0];
type SubStep = Chunk['subSteps'][0];

export type DiffStatus = 'added' | 'removed' | 'unchanged' | 'modified';

export interface SubStepDiff {
    status: DiffStatus;
    data: SubStep;
}

export interface ChunkDiff {
    status: DiffStatus;
    data: Chunk;
    subStepDiffs?: SubStepDiff[];
}

export interface DiffResult {
    chunks: ChunkDiff[];
}

export const diffMaps = (oldMap: MomentumMap, newMap: MomentumMap): DiffResult => {
    const oldChunksByTitle = new Map(oldMap.chunks.map(c => [c.chunkTitle, c]));
    const newChunksByTitle = new Map(newMap.chunks.map(c => [c.chunkTitle, c]));
    
    const allChunkTitles = new Set([...oldMap.chunks.map(c => c.chunkTitle), ...newMap.chunks.map(c => c.chunkTitle)]);
    
    const chunkDiffs: ChunkDiff[] = [];

    allChunkTitles.forEach(title => {
        const oldChunk = oldChunksByTitle.get(title);
        const newChunk = newChunksByTitle.get(title);

        if (oldChunk && !newChunk) {
            chunkDiffs.push({ status: 'removed', data: oldChunk });
        } else if (!oldChunk && newChunk) {
            chunkDiffs.push({ status: 'added', data: newChunk });
        } else if (oldChunk && newChunk) {
            const oldSubStepsByDesc = new Map(oldChunk.subSteps.map(s => [s.description, s]));
            const newSubStepsByDesc = new Map(newChunk.subSteps.map(s => [s.description, s]));
            const allSubStepDescs = new Set([...oldChunk.subSteps.map(s => s.description), ...newChunk.subSteps.map(s => s.description)]);

            let isModified = false;
            const subStepDiffs: SubStepDiff[] = [];
            
            allSubStepDescs.forEach(desc => {
                const oldStep = oldSubStepsByDesc.get(desc);
                const newStep = newSubStepsByDesc.get(desc);

                if (oldStep && !newStep) {
                    isModified = true;
                    subStepDiffs.push({ status: 'removed', data: oldStep });
                } else if (!oldStep && newStep) {
                    isModified = true;
                    subStepDiffs.push({ status: 'added', data: newStep });
                } else if (oldStep && newStep) {
                    // Could add deeper comparison here (e.g., on 'estimate')
                    subStepDiffs.push({ status: 'unchanged', data: newStep });
                }
            });

            if (isModified) {
                chunkDiffs.push({ status: 'modified', data: newChunk, subStepDiffs });
            } else {
                chunkDiffs.push({ status: 'unchanged', data: newChunk, subStepDiffs });
            }
        }
    });

    return { chunks: chunkDiffs };
};
