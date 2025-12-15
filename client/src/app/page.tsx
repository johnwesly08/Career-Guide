'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { 
  Sparkles, 
  Target, 
  BarChart3, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Brain,
  Zap,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Target className="w-9 h-9 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Career Compass</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">AI-Powered Career Guidance</p>
              </div>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                AI-Powered Career Matching
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Navigate Your Career
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                with AI Precision
              </span>
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10">
              Get intelligent match scores for job postings, discover skill gaps, and receive 
              personalized career guidance powered by advanced AI technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                Click to Explore
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: BarChart3,
                title: 'Smart Job Analysis',
                description: 'Get detailed match scores and insights for any job posting in seconds.'
              },
              {
                icon: MessageSquare,
                title: 'AI Career Chat',
                description: 'Ask career questions and receive instant, personalized guidance from AI.'
              },
              {
                icon: Zap,
                title: 'Skill Gap Detection',
                description: 'Identify missing skills and get actionable tips to bridge the gap.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-full mb-6">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    Why Choose Us
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Land Your Dream Job Faster
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Our AI-powered platform analyzes thousands of data points to give you 
                  the competitive edge you need in today's job market.
                </p>
                <div className="space-y-4">
                  {[
                    'Instant job compatibility analysis',
                    'Personalized skill recommendations',
                    'Real-time career guidance',
                    'Track your progress over time'
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl font-bold text-indigo-600">8/10</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Average Match Score</div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Students see their job compatibility instantly
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl font-bold text-purple-600">3min</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Average Analysis Time</div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get comprehensive insights in under 3 minutes
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <Shield className="w-10 h-10 text-emerald-600" />
                    <div className="text-sm text-slate-600 dark:text-slate-400">Secure & Private</div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your data is encrypted and never shared
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Career Journey?
            </h3>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are landing their dream jobs with AI-powered guidance.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 Career Compass. Powered by AI. Built for Students.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}