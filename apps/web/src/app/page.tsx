import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">WTDo</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Smart reminders with natural language
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

