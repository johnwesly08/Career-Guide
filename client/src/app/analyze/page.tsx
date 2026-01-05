'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  AlertCircle,
  CheckCircle,
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function AnalyzePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleAnalyze = async () => {
    if(!user) {
      alert('User not authenticated');
      return
    }

    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload your resume and add a job description');
      return;
    }

    setAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_desc', jobDescription);
      formData.append('user_id', user.uid);
            
      const response = await fetch('http://localhost:8000/api/v1/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  // ✅ SAFE, NORMALIZED SCORE FOR UI
  const overallScore =
    typeof result?.overallScore === 'number'
      ? Math.min(Math.max(result.overallScore, 0), 100)
      : null;

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      </ThemeProvider>
    );
  }  

  if (!user) return null;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Header />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600">Job Match Analysis</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Analyze Your Job Match
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Upload your resume and job description to get an instant compatibility score
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Resume Upload */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  1. Upload Your Resume
                </h2>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition-all">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF format only (Max 5MB)</p>
                  </label>
                </div>
                {resumeFile && (
                  <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {(resumeFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  2. Paste Job Description
                </h2>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="w-full h-64 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {jobDescription.length} characters
                </p>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!resumeFile || !jobDescription.trim() || analyzing}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Match
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            <div>
              {result ? (
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Your Match Score
                      </p>
                      {/* SCORE */}
                      <div className="flex items-end justify-center gap-2 mb-2">
                        <div className="text-6xl font-bold text-slate-900 dark:text-slate-100">
                          {overallScore !== null ? overallScore : 'N/A'}
                        </div>
                        <div className="text-sm text-slate-500 mb-2">/ 100</div>
                      </div>

                      {/* PROGRESS BAR */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all"
                          style={{ width: `${overallScore ?? 0}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                      {(result.matchScore || result.match_score || 0) >= 7 
                        ? 'Great match! You meet most of the job requirements.'
                        : 'Consider developing skills to better match this role.'}
                    </p>
                  </div>

                  {/* Matching SKills */}
                  {result.matchingSkills?.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          Matching Skills
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {result.matchingSkills.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="
                              px-3 py-1.5
                              bg-green-100 dark:bg-green-900/30
                              text-green-700 dark:text-green-300
                              rounded-lg
                              text-sm font-medium
                              border border-green-200 dark:border-green-800
                            "
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strengths */}
                  {result.strengths && result.strengths.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          Your Strengths
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {result.strengths.map((strength: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-700 dark:text-slate-300">{strength}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skill Gaps */}
                  {result.missingSkills && result.missingSkills.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          Skill Gaps
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {result.missingSkills.map((gap: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-700 dark:text-slate-300">{gap}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.improvements && result.improvements.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          Improvements
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {result.improvements.map((rec: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-indigo-600">{idx + 1}</span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{rec}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.feedback && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          Overall Summary
                        </h3>
                      </div>

                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                        {result.feedback}
                      </p>
                    </div>
                  )}

                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      setResult(null);
                      setResumeFile(null);
                      setJobDescription('');
                    }}
                    className="w-full px-6 py-3 bg-slate-300 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl font-semibold hover:bg-slate-500 dark:hover:bg-slate-700 transition-all"
                  >
                    Start New Analysis
                  </button>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center h-full flex items-center justify-center">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Upload your resume and add the job description to get started
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}