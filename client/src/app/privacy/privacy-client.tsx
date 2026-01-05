'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyClient() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="
            inline-flex items-center gap-2 mb-4
            text-sm font-medium
            text-slate-600 dark:text-slate-400
            hover:text-slate-900 dark:hover:text-slate-200
            transition-colors
          "
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Card (matches dashboard UI) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <section className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Career Compass respects your privacy and is committed to protecting
            your personal information.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email address,
            resume content, and usage data.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            How We Use Your Information
          </h2>
          <p>
            Your information is used to provide career insights, resume analysis,
            and to improve platform performance.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Data Security
          </h2>
          <p>
            We apply reasonable security measures, but no system is completely
            secure.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Third-Party Services
          </h2>
          <p>
            We may use third-party services (authentication, AI providers) that
            follow their own privacy policies.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Changes to This Policy
          </h2>
          <p>
            Continued use of the platform indicates acceptance of updated
            privacy policies.
          </p>
        </section>
      </div>
    </div>
  );
}
