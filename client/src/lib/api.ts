import axios from 'axios';
import type { AnalysisResult, ChatResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeResume = async (
  resume: File,
  jobDescription: string
): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('job_description', jobDescription);

  const response = await api.post<AnalysisResult>('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const sendChatMessage = async (
  message: string,
  sessionId?: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/chat', {
    message,
    session_id: sessionId,
  });

  return response.data;
};

export default api;
