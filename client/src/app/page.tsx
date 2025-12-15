'use client';
import Link from 'next/link';
import { Target, BarChart3, MessageSquare, Sparkles, ArrowRight, Zap, Brain, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import ProtectedRoute from '@/components/ProtectedRoutes';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function HomePage() {
  return (
    <ThemeProvider>
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header/>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">AI-Powered Career Analysis</span>
          </div>
          <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
            Navigate Your Career with
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> AI Precision</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Upload your resume, paste a job description, and receive personalized insights, gap analysis, and career guidance powered by advanced AI.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link 
              href="/analyze"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              <Zap className="w-5 h-5" />
              Start Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/chat"
              className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Try Career Chat
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { 
              icon: Brain, 
              title: 'AI-Powered Analysis', 
              desc: 'Langchain + LLM integration for intelligent resume analysis',
              color: 'indigo'
            },
            { 
              icon: TrendingUp, 
              title: 'Gap Identification', 
              desc: 'Discover missing skills and get actionable recommendations',
              color: 'purple'
            },
            { 
              icon: MessageSquare, 
              title: 'Interactive Chat', 
              desc: 'Get personalized career guidance through conversational AI',
              color: 'pink'
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </ProtectedRoute>
    </ThemeProvider>
  );
}