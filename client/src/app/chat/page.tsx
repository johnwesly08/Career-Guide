'use client';
import Chatbox from '@/components/features/ChatBox';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Career Guidance Chat
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ask questions about your career path, skills, and improvements
                </p>
              </div>
            </div>
          </div>
          <Chatbox />
        </div>
      </div>
    </div>
  );
}