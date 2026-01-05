'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Link from 'next/link';
import { 
  BarChart3, 
  MessageSquare, 
  Target, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<{
  jobsAnalyzed: number;
  chatCount: number;
  averageScore: number | '--';
}>({
  jobsAnalyzed: 0,
  chatCount: 0,
  averageScore: '--',
});


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
  if (!user) return;

  fetch(`http://localhost:8000/api/v1/dashboard/${user.uid}`)
    .then(res => res.json())
    .then(data => {
      setStats({
        jobsAnalyzed: data.jobsAnalyzed ?? 0,
        chatCount: data.chatCount ?? 0,
        averageScore: data.averageScore ?? '--',
      });
    })
    .catch(err => {
      console.error('Failed to fetch dashboard stats:', err);
    });
}, [user]);


  

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
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600">Welcome Back</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Hello, {user.displayName || 'there'}! 👋
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Ready to advance your career journey?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/analyze"
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Analyze Job Match
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Upload your resume and job description to get an instant compatibility score and insights.
              </p>
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Takes ~3 minutes</span>
              </div>
            </Link>

            <Link
              href="/chat"
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Career Chat
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Ask any career-related questions and get personalized AI-powered guidance instantly.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Answers</span>
              </div>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                  This Week
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {stats.jobsAnalyzed}
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                Jobs Analyzed
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  All Time
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {stats.chatCount}
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                Chat Conversations
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                  Average
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {stats.averageScore}
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                Match Score
              </div>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              🚀 Getting Started
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Upload Your Resume',
                  description: 'Go to the Analyze section and upload your resume in PDF format.',
                  completed: false
                },
                {
                  step: '2',
                  title: 'Add Job Description',
                  description: 'Paste the job description you want to apply for.',
                  completed: false
                },
                {
                  step: '3',
                  title: 'Get Instant Insights',
                  description: 'Receive match scores, skill gaps, and actionable recommendations.',
                  completed: false
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    item.completed
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}