// src/types/personality-test.ts
export interface SurveyAnswer {
    id: number;
    text: string;
}

export interface SurveyQuestion {
    id: number;
    quality: "O" | "C" | "E" | "A" | "N"; // OCEAN traits
    text: string;
    answers: SurveyAnswer[];
}

export interface VisualQuestion {
    id: number;
    text: string;
    answers: Array<{
        id: number;
        text: string;
        icon?: string; // For image-based answers
    }>;
}

// Response tracking
export interface SurveyResponse {
    questionId: number;
    answerId: number;
}

export interface VisualResponse {
    questionId: number;
    answerIds: number[]; // Array for multiple selections
}

// Final personality results
export interface PersonalityResult {
    O: number; // Openness (1-5)
    C: number; // Conscientiousness (1-5)
    E: number; // Extroversion (1-5)
    A: number; // Agreeableness (1-5)
    N: number; // Neuroticism (1-5)
}
