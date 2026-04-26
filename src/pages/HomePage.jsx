import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Map, BookOpen, CheckSquare, Clock, MonitorPlay, 
  GraduationCap, MapPin, ArrowRight, Zap, Shield, 
  Globe, Sparkles, ChevronRight, Star 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Map,
    gradient: 'from-violet-500 to-indigo-600',
    glow: 'rgba(99,102,241,0.35)',
    label: 'Voter Journey',
    path: '/journey',
    desc: 'Your 6-step guided path from registration to casting your vote, with progress tracking.',
  },
  {
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.35)',
    label: 'Step-by-Step Guide',
    path: '/guide',
    desc: 'First-timer or refresher. Swipe through each stage of the voting process with expert tips.',
  },
  {
    icon: CheckSquare,
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.3)',
    label: 'Voter Checklist',
    path: '/checklist',
    desc: 'Never forget a document or deadline. Your personal pre-election preparation tracker.',
  },
  {
    icon: Clock,
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.3)',
    label: 'Election Timeline',
    path: '/timeline',
    desc: 'Live 8-phase timeline showing exactly where the election process stands right now.',
  },
  {
    icon: MonitorPlay,
    gradient: 'from-rose-500 to-pink-500',
    glow: 'rgba(244,63,94,0.3)',
    label: 'EVM Simulator',
    path: '/simulator',
    desc: 'Practice on a pixel-perfect replica of an Indian EVM and VVPAT before election day.',
  },
  {
    icon: GraduationCap,
    gradient: 'from-purple-500 to-violet-600',
    glow: 'rgba(139,92,246,0.3)',
    label: 'Learn Center',
    path: '/learn',
    desc: 'Glossary, knowledge quiz, and candidate comparison — become an informed voter.',
  },
];

const STATS = [
  { value: '900M+', label: 'Registered voters in India' },
  { value: 'Free', label: 'No account required' },
  { value: 'AI', label: 'Powered assistant' },
  { value: '2', label: 'Languages supported' },
];

const TRUST_ITEMS = [
  { icon: Shield, text: 'Non-partisan — no party opinions, ever' },
  { icon: Globe, text: 'ECI-aligned facts and process information' },
  { icon: Zap, text: 'Zero data collection, works offline' },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-4 sm:pt-24 sm:pb-28 text-center overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.07]"
               style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
               style={{ background: 'radial-gradient(ellipse, #06b6d4 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-200/60 text-sm font-semibold text-indigo-700 mb-6 animate-fade-up shadow-soft">
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              India's first-time voter companion
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
            Vote with{' '}
            <span className="shimmer-text">confidence.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '140ms' }}>
            Everything a first-time Indian voter needs — from registration to the polling booth — in one calm, trusted, AI-powered app.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <button
              onClick={() => navigate('/journey')}
              className="btn-primary gap-2 !px-7 !py-3.5 !text-base !rounded-2xl group"
            >
              Start My Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => navigate('/guide')}
              className="btn-ghost !px-6 !py-3.5 !text-base !rounded-2xl border border-gray-200 hover:border-gray-300 gap-2"
            >
              See how it works
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mb-2 animate-fade-up" style={{ animationDelay: '260ms' }}>
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-2xs text-indigo-600 font-bold uppercase tracking-[0.18em] mb-2">Everything you need</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Six powerful tools,<br />one simple mission.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <button
                key={f.path}
                onClick={() => navigate(f.path)}
                className="group text-left surface-interactive rounded-2xl p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    style={{ boxShadow: `0 4px 16px ${f.glow}` }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{f.label}</h3>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── AI Assistant highlight ────────────────────────────────────────── */}
      <section className="px-4 pb-16 max-w-3xl mx-auto">
        <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #7c3aed 100%)' }}>
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10"
               style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 32px,rgba(255,255,255,0.3) 32px,rgba(255,255,255,0.3) 33px),repeating-linear-gradient(90deg,transparent,transparent 32px,rgba(255,255,255,0.3) 32px,rgba(255,255,255,0.3) 33px)' }} />
          <div className="relative p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 animate-float">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1.5">AI Election Assistant</h3>
              <p className="text-indigo-200 text-sm leading-relaxed max-w-md">
                Have a question about EVM tampering myths, booth location, or what ID to carry? Ask our AI — trained exclusively on Indian election facts.
              </p>
            </div>
            <button
              onClick={() => navigate('/journey')}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-md"
            >
              Try it <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 max-w-3xl mx-auto">
        <div className="surface rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-around gap-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-2.5 text-sm text-gray-600">
                <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-black/[0.05] px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-gray-900">VoteX</span>
            <span className="text-xs text-gray-400">· Non-partisan voter guide</span>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Not affiliated with ECI. All information is for educational purposes only.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
