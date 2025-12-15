export interface AnalysisResult {
  overallScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  feedback: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnalyzeRequest {
  resume: File;
  job_description: string;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
}
