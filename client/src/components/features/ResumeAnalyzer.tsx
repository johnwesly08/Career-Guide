'use client';
import { Check, X, Award, TrendingUp, Download, RefreshCw, ArrowRight } from 'lucide-react';

interface AnalysisResult {
  overallScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  feedback: string | { content: string };
}

interface ResumeAnalyzerProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResumeAnalyzer({ result, onReset }: ResumeAnalyzerProps) {
  console.log('Analysis Result:', result);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-slate-100">
              Analysis Results
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Based on resume and job description comparison
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-900 dark:text-slate-100">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={onReset}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-900 dark:text-slate-100"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-3">
            <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {result.overallScore}
            </div>
            <div className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              / 100
            </div>
          </div>
          <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 rounded-full"
              style={{ width: `${result.overallScore}%` }}
            />
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300">{typeof result.feedback === 'object' ? result.feedback.content : result.feedback}</p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Matching Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchingSkills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium border border-green-500/20"
              >
                {skill}
              </span>
            )) || <p>No missing skills</p>}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <X className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Missing Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium border border-orange-500/20"
              >
                {skill}
              </span>
            )) || <p>No missing skills</p>}
          </div>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Award className="w-5 h-5 text-indigo-600" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {result.strengths.map((strength, idx) => (
              <li key={idx} className="flex gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Improvements
          </h3>
          <ul className="space-y-3">
            {result.improvements.map((improvement, idx) => (
              <li key={idx} className="flex gap-3">
                <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}