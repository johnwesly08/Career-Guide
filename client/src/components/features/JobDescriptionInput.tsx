'use client';
import { Target } from 'lucide-react';

const JOB_PLACEHOLDER = `Paste the job description here...

Requirements:
- 3+ years of experience
- Proficiency in React, TypeScript
- Knowledge of backend technologies
...`;

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
        <Target className="w-4 h-4" />
        Job Description
      </label>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={JOB_PLACEHOLDER}
          className="w-full h-[280px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none"
        />
      </div>
    </div>
  );
}
