
import { GoogleGenAI, Type } from "@google/genai";

// --- Type Definition for the AI-generated plan ---
export interface MomentumMap {
  chunks: {
    chunkTitle: string;
    energyTag: 'Low' | 'Medium' | 'High';
    subSteps: {
      description: string;
      estimate: string;
    }[];
  }[];
  acceptanceCriteria: string[];
}

// --- AI Configuration ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const systemInstruction = `You are an expert project planner specializing in productivity for individuals with ADHD. Your task is to break down a user's large goal into a clear, encouraging, and actionable plan.

Your plan must include:
1.  **Chunks**: No more than 9 main chunks. Each chunk should have a verb-first title (e.g., "Define your podcast concept").
2.  **Energy Tag**: For each chunk, assign an energy level: 'Low', 'Medium', or 'High'.
3.  **Sub-steps**: Each chunk must have between 1 and 5 small, concrete sub-steps. Each sub-step must be a verb-first command (e.g., "Identify 3 competing podcasts").
4.  **Estimates**: For each sub-step, provide a brief time estimate (e.g., "15 mins", "1 hour", "2-3 hours").
5.  **Acceptance Criteria**: A list of 3-5 clear, bullet-point criteria that define when the overall goal is successfully completed.

Your tone should be supportive and neutral. Structure the entire output according to the provided JSON schema.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    chunks: {
      type: Type.ARRAY,
      description: "An array of the main project chunks or phases.",
      items: {
        type: Type.OBJECT,
        properties: {
          chunkTitle: {
            type: Type.STRING,
            description: "A short, verb-first title for the chunk (e.g., 'Research Target Audience').",
          },
          energyTag: {
            type: Type.STRING,
            description: "The estimated energy level required for the chunk.",
            enum: ['Low', 'Medium', 'High'],
          },
          subSteps: {
            type: Type.ARRAY,
            description: "A list of small, actionable sub-steps for this chunk.",
            items: {
              type: Type.OBJECT,
              properties: {
                description: {
                  type: Type.STRING,
                  description: "A verb-first description of a single sub-step (e.g., 'Identify 3 competing podcasts').",
                },
                estimate: {
                  type: Type.STRING,
                  description: "A brief time estimate for the sub-step (e.g., '30 mins')."
                }
              },
              required: ["description", "estimate"]
            },
          },
        },
        required: ["chunkTitle", "energyTag", "subSteps"],
      },
    },
    acceptanceCriteria: {
        type: Type.ARRAY,
        description: "A list of criteria to define when the goal is complete.",
        items: {
            type: Type.STRING
        }
    }
  },
  required: ["chunks", "acceptanceCriteria"],
};


// --- Resilience Configuration ---
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

/**
 * A centralized and resilient function for making AI content generation requests.
 * It wraps the AI client call with retry logic and exponential backoff.
 *
 * @param {string} prompt The user's prompt to send to the AI.
 * @returns {Promise<MomentumMap>} The AI's response, parsed as a MomentumMap object.
 * @throws Will throw an error if the request fails after all retries.
 */
export const generateContentWithRetry = async (prompt: string): Promise<MomentumMap> => {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.7, // Add some creativity to the planning
        },
      });

      const jsonText = response.text.trim();
      const parsedJson = JSON.parse(jsonText);
      
      // Basic validation to ensure the parsed object matches our expected structure
      if (parsedJson && Array.isArray(parsedJson.chunks) && Array.isArray(parsedJson.acceptanceCriteria)) {
        return parsedJson as MomentumMap;
      } else {
        throw new Error("AI response is not in the expected format.");
      }

    } catch (error: any) {
      lastError = error;
      console.error(`[AI Service] Attempt ${attempt + 1} failed:`, error);

      // Don't retry on client-side errors (e.g., invalid input)
      if (error.status && error.status >= 400 && error.status < 500) {
        console.error('[AI Service] Non-retryable error:', error.message);
        break;
      }
      
      if (attempt < MAX_RETRIES - 1) {
        const backoffTime = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        console.log(`[AI Service] Retrying after ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }

  console.error(`[AI Service] Request failed after all retries.`);
  throw lastError;
};

/**
 * Generates a new Momentum Map, respecting user-locked chunks.
 *
 * @param {string} goal The user's original goal.
 * @param {MomentumMap['chunks']} lockedChunks An array of chunks the user has locked.
 * @returns {Promise<MomentumMap>} The newly generated Momentum Map.
 */
export const generateReplan = async (goal: string, lockedChunks: MomentumMap['chunks']): Promise<MomentumMap> => {
  const lockedChunksJson = JSON.stringify(lockedChunks, null, 2);
  
  const replanSystemInstruction = `You are an expert project planner specializing in productivity. Your task is to create a new plan for the goal: "${goal}".
The user has locked the following chunks, which you MUST include in your plan exactly as they are. You should build the rest of the plan around them. Do not modify, re-order, or remove these locked chunks.

Locked Chunks:
${lockedChunksJson}

The new plan should still adhere to the total chunk limit of 9. Your entire output must be in the provided JSON schema.`;

  // Using generateContentWithRetry for resilience
  return generateContentWithRetry(`Create a new plan for the goal "${goal}" while keeping the locked chunks.`);
};

/**
 * Generates supportive suggestions for a user who is stuck on a task.
 *
 * @param {object} context - The context for the stuck situation.
 * @param {string} context.goal - The overall goal.
 * @param {MomentumMap['chunks'][0]} context.chunk - The specific chunk the user is stuck on.
 * @returns {Promise<string[]>} An array of 2-3 encouraging suggestions.
 */
export const generateStuckSuggestions = async ({ goal, chunk }: { goal: string, chunk: MomentumMap['chunks'][0] }): Promise<string[]> => {
    const chunkJson = JSON.stringify({ title: chunk.chunkTitle, steps: chunk.subSteps.map(s => s.description) }, null, 2);
    
    const suggestionSystemInstruction = `You are a supportive and encouraging productivity coach. A user is stuck on a task.
Their overall goal is: "${goal}"
The specific chunk they are blocked on is:
${chunkJson}

Provide 2-3 very short, actionable, and encouraging suggestions to help them get unstuck. Frame your suggestions as commands they can do right now. Your tone must be gentle and non-judgmental. Do not be condescending.

Examples: "Break this step into even smaller pieces.", "Set a 5-minute timer and just start.", "Ask a friend for their opinion."`;

    const suggestionSchema = {
        type: Type.OBJECT,
        properties: {
            suggestions: {
                type: Type.ARRAY,
                description: "A list of 2-3 short, actionable suggestions.",
                items: { type: Type.STRING }
            }
        },
        required: ["suggestions"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: `I'm stuck on the chunk titled "${chunk.chunkTitle}". What should I do?`,
            config: {
                systemInstruction: suggestionSystemInstruction,
                responseMimeType: "application/json",
                responseSchema: suggestionSchema,
                temperature: 0.8,
            },
        });
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        if (parsedJson && Array.isArray(parsedJson.suggestions)) {
            return parsedJson.suggestions;
        }
        throw new Error("Invalid format for suggestions.");
    } catch (error) {
        console.error("[AI Service] Failed to get stuck suggestions:", error);
        // Provide fallback suggestions if the API fails
        return [
            "Take a 5-minute break and come back.",
            "Break the first sub-step into an even smaller task.",
            "Ask someone for their perspective."
        ];
    }
};
