
export interface SurveyAnswer {
    id: number;
    text: string;
}

export interface SurveyQuestion {
    id: number;
    quality: "O" | "C" | "E" | "A" | "N"; 
    text: string;
    answers: SurveyAnswer[];
}

export interface VisualQuestion {
    id: number;
    text: string;
    answers: Array<{
        id: number;
        text: string;
        icon?: string; 
    }>;
}


export interface SurveyResponse {
    questionId: number;
    answerId: number;
}

export interface VisualResponse {
    questionId: number;
    answerIds: number[]; 
}


export interface PersonalityResult {
    O: number; 
    C: number; 
    E: number; 
    A: number; 
    N: number; 
}
