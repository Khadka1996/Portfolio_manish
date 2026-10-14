import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-transparent text-white">
      <p className="text-[#1DCD9F] font-mono text-sm mb-4">404 · route not found</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">This page took a wrong turn</h1>
      <p className="text-gray-400 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead:
      </p>
      <nav className="flex flex-wrap justify-center gap-3" aria-label="Helpful links">
        <Link href="/" className="px-5 py-2.5 rounded-full bg-[#1DCD9F] text-black font-medium hover:bg-[#169976]">Home</Link>
        <Link href="/work" className="px-5 py-2.5 rounded-full border border-[#1DCD9F] text-[#1DCD9F] hover:bg-[#1DCD9F]/10">Projects</Link>
        <Link href="/contact" className="px-5 py-2.5 rounded-full border border-white/10 hover:border-[#1DCD9F]">Contact</Link>
      </nav>
    </main>
  );
}
