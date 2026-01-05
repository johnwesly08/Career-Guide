import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='mt'>
      <div
        className="
          border-t
          border-slate-200 dark:border-slate-800
          bg-gradient-to-br
          from-slate-50 to-slate-100
          dark:from-slate-950 dark:to-slate-900
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Left */}
          <p className="text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Career Compass. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="
                text-slate-600 dark:text-slate-400
                hover:text-slate-900 dark:hover:text-slate-200
                transition-colors
              "
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="
                text-slate-600 dark:text-slate-400
                hover:text-slate-900 dark:hover:text-slate-200
                transition-colors
              "
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
