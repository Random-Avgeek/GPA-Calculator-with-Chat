export interface Subject {
  grade: string;
  credits: number;
}

export interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  question: string;
  answer: string;
}