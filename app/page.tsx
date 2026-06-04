import WelcomeSection from "./sections/welcome";
import UtilitiesSection from "./sections/utilities";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero placeholder — will be replaced in future task */}
      <section className="flex flex-col items-center justify-center py-20 px-8 bg-gradient-to-b from-navy to-navy-700">
        <div className="flex items-center gap-3 mb-4">
          <svg aria-hidden="true" className="w-10 h-10 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3">60 Walker St</h1>
        <p className="text-xl text-navy-100">Household Portal — Shared Respect & Clear Communication</p>
      </section>

      <WelcomeSection />
      <UtilitiesSection />

      {/* Placeholder for remaining sections */}
      <section className="py-12 px-4 text-center text-slate-400">
        <p>Contact section coming next...</p>
      </section>
    </main>
  );
}
