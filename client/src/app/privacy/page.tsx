export const metadata = {
  title: 'Privacy Policy | Career Compass',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header (same pattern as dashboard & terms) */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Card container (same as dashboard cards) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <section className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Career Compass respects your privacy and is committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, and safeguard your data.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email address,
            resume content, and usage data when you use our services.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            How We Use Your Information
          </h2>
          <p>
            Your information is used to provide resume analysis, career insights,
            personalized recommendations, and to improve the overall
            performance of the platform.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Data Storage & Security
          </h2>
          <p>
            We take reasonable measures to protect your data. However, no method
            of electronic storage or transmission over the internet is 100%
            secure.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Third-Party Services
          </h2>
          <p>
            Career Compass may use trusted third-party services (such as AI or
            authentication providers) to deliver features. These services follow
            their own privacy policies.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Continued use of
            the application indicates acceptance of the updated policy.
          </p>
        </section>
      </div>
    </div>
  );
}
