import React from "react";
import {
  Calendar,
  Clock,
  Video,
  Hourglass,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Flame,
  Wind,
  HeartHandshake,
  Radio,
  BookOpen,
} from "lucide-react";

export default function WorkshopDetails() {
  const coreModules = [
    {
      num: "1",
      title: "Shatkarma",
      desc: "Traditional yogic cleansing practices and their importance.",
    },
    {
      num: "2",
      title: "Asana",
      desc: "Improve flexibility, strength, mobility, balance and body alignment through systematic practice.",
    },
    {
      num: "3",
      title: "Pranayama",
      desc: "Understand the science of breathing and learn different pranayama techniques.",
    },
    {
      num: "4",
      title: "Mudra",
      desc: "Explore yogic gestures and their role in regulating energy.",
    },
    {
      num: "5",
      title: "Bandha",
      desc: "Learn the three major bandhas and understand how to engage and apply them correctly.",
    },
    {
      num: "6",
      title: "Meditation",
      desc: "Understand and practise traditional yogic techniques for holistic development.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Top Presenter Pill */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-wellness-gold/15 text-wellness-goldDark border border-wellness-gold/30 shimmer-badge font-sans">
          <Sparkles className="w-3.5 h-3.5 text-wellness-gold" />
          YOGA REGIME PRESENTS
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-wellness-emeraldBg text-wellness-primary border border-wellness-primary/20">
          <Users className="w-3.5 h-3.5" />
          Guided by Harpreet Kaur
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3">
        <div className="inline-block">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-wellness-goldDark">
            A Complete Yogic Journey
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-wellness-dark tracking-tight leading-[1.1] font-serif uppercase">
          SAMPOORNA <span className="text-wellness-primary italic font-serif">YOGA</span>
        </h1>
        <p className="text-lg sm:text-2xl font-bold text-wellness-goldDark font-serif">
          Sampoorna Yoga – A Complete Yogic Journey
        </p>
        <p className="text-sm sm:text-base text-wellness-muted font-medium leading-relaxed">
          Thank you for showing interest in our Sampoorna Yoga Program. This is a one-month online yoga program designed to help you explore yoga beyond just physical postures and experience its different dimensions.
        </p>
      </div>

      {/* Details Grid (Duration • Days • Timing • Mode) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Hourglass className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Duration
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            1 Month
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            Complete Journey
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Calendar className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Days
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            Mon, Wed & Fri
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            3 Days a Week
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Clock className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Timing
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            7:00 AM – 8:00 AM
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            IST (Morning)
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Video className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Mode
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            Online Classes
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            Live on Zoom
          </span>
        </div>
      </div>

      {/* Program Details & Recording Notice Banner */}
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-wellness-dark via-wellness-primaryDark to-wellness-primary text-white shadow-premium-lg border-2 border-wellness-gold/40 overflow-hidden">
        {/* Glow & Decorative border */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-wellness-gold/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wellness-gold/25 border border-wellness-gold/50 text-wellness-goldLight text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-wellness-goldLight" />
              PROGRAM DETAILS
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wide border border-emerald-400/40">
                <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                RECORDING AVAILABLE FOR SELF PRACTICE
              </span>
            </div>
            <p className="text-xs text-gray-200 font-medium">
              1-Month Online Yoga Program • Mon, Wed &amp; Fri • 7:00 AM – 8:00 AM IST
            </p>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-6 shrink-0">
            <div className="text-xs font-bold text-wellness-goldLight uppercase tracking-wider">
              PROGRAM FEE:
            </div>
            <div className="text-3xl sm:text-4xl font-black text-wellness-goldLight font-mono tracking-tight drop-shadow-sm mt-0.5">
              ₹1,500
            </div>
            <div className="text-[11px] text-gray-300 font-medium mt-0.5">
              All 12+ Sessions &amp; Recordings Included
            </div>
          </div>
        </div>
      </div>

      {/* What Will You Learn? Section */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-wellness-dark font-serif tracking-tight">
              WHAT WILL YOU LEARN?
            </h2>
          </div>
          <span className="text-xs font-bold text-wellness-primary uppercase tracking-wider hidden sm:inline-block">
            6 Dimensions of Yoga
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {coreModules.map((item) => (
            <div
              key={item.num}
              className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-wellness-cream/90 border border-wellness-border/70 hover:border-wellness-gold/50 hover:bg-white transition-all shadow-xs group"
            >
              <div className="mt-0.5 w-7 h-7 rounded-xl bg-wellness-emeraldBg text-wellness-primary font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-wellness-primary group-hover:text-white transition-colors">
                {item.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-wellness-dark group-hover:text-wellness-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-wellness-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Sampoorna Yoga - Intentions Card */}
      <div className="p-5 rounded-3xl bg-wellness-surface border border-wellness-border space-y-3">
        <div className="flex items-center gap-2 text-wellness-primary">
          <BookOpen className="w-4 h-4 text-wellness-gold" />
          <h3 className="text-sm sm:text-base font-bold text-wellness-dark font-serif">
            A Deeper Understanding of Yoga
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-wellness-muted leading-relaxed">
          Whether you are a beginner or have been practising yoga for some time, this program will help you develop a deeper understanding of yoga through proper techniques, guidance and consistent practice.
        </p>
        <div className="p-3.5 rounded-2xl bg-wellness-emeraldBg/60 border border-wellness-primary/20 text-center">
          <p className="text-sm sm:text-base font-serif font-bold text-wellness-primary italic">
            &ldquo;Our intention is to help you experience Sampoorna Yoga – where the body, breath and mind work together.&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Tagline & Instructor Signature */}
      <div className="space-y-3 pt-2 border-t border-wellness-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-wellness-border/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-wellness-emeraldBg text-wellness-primary flex items-center justify-center font-bold text-base shrink-0 border border-wellness-primary/20">
              <Award className="w-5 h-5 text-wellness-primary" />
            </div>
            <div>
              <p className="text-xs text-wellness-muted font-medium">Program Mentor &amp; Lead</p>
              <h4 className="text-sm font-bold text-wellness-dark">Harpreet Kaur</h4>
              <p className="text-[11px] text-wellness-goldDark font-semibold">Yoga Regime</p>
            </div>
          </div>
          <div className="text-xs text-wellness-muted flex items-center gap-1.5 font-medium">
            <Award className="w-4 h-4 text-wellness-gold shrink-0" />
            <span>Structured Practice • Holistic Development</span>
          </div>
        </div>
      </div>
    </div>
  );
}
