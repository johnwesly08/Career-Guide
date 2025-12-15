'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumeUploader from '@/components/features/ResumeUploader';
import JobDescriptionInput from '@/components/features/JobDescriptionInput';
import ResumeAnalyzer from '@/components/features/ResumeAnalyzer';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) return;
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_desc', jobDescription);
      
      const response = await fetch('http://localhost:8000/api/v1/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {!analysisResult ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">AI-Powered Analysis</span>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                Optimize Your Career Path
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Upload your resume and paste a job description to receive personalized insights.
              </p>
            </div>

            {/* Upload Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <ResumeUploader onFileSelect={setFile} selectedFile={file} />
              <JobDescriptionInput 
                value={jobDescription} 
                onChange={setJobDescription} 
              />
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!file || !jobDescription.trim() || isAnalyzing}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze Resume
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <ResumeAnalyzer result={analysisResult} onReset={() => setAnalysisResult(null)} />
        )}
      </div>
    </div>
  );
}