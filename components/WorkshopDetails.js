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
} from "lucide-react";

export default function WorkshopDetails() {
  const coreModules = [
    {
      title: "Diaphragmatic & Complete Yogic Breathing",
      desc: "Unlock your full 3-part breathing mechanics (belly, chest, clavicular) to activate diaphragmatic capacity, oxygenate vital organs, and eliminate shallow chest breathing.",
    },
    {
      title: "Pranayama Asanas & Postural Alignment",
      desc: "Master preparatory postures, spinal alignment, and bandhas (energy locks) essential to channel prana safely and sit comfortably with effortless posture.",
    },
    {
      title: "Breath Awareness & Mind-Body Coordination",
      desc: "Develop acute breath awareness to soothe the autonomic nervous system, calm an overactive mind, release mental fog, and dissolve stress within minutes.",
    },
    {
      title: "Core Pranayama Mastery (Nadi Shodhana, Kapalabhati, Bhastrika)",
      desc: "Step-by-step practical training in classical pranayama techniques with precise rhythmic counts, nostrils coordination, and safe progression.",
    },
    {
      title: "Safe Breath Retention & Kumbhaka Science",
      desc: "Learn internal (Antar) and external (Bahir) retention safely without strain, building cardiovascular tolerance and energetic stability.",
    },
    {
      title: "1-Month Habit Building & Daily Integration",
      desc: "12 live guided interactive classes structured across 4 weeks to establish an unbreakable daily breathing ritual for lifelong energy and inner peace.",
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
          Live Interactive 1-Month Program
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-wellness-dark tracking-tight leading-[1.1] font-serif uppercase">
          BREATH<span className="text-wellness-primary italic font-serif">WISE</span>
        </h1>
        <p className="text-lg sm:text-2xl font-bold text-wellness-goldDark font-serif">
          1-Month Breathing &amp; Pranayama Program
        </p>
        <p className="text-sm sm:text-base italic text-wellness-muted font-medium">
          &ldquo;Understand Your Breath. Transform Your Practice.&rdquo;
        </p>
      </div>

      {/* Details Grid (Starting 16 Nov • Mon/Wed/Fri • 6:30 PM - 7:30 PM • Online Classes) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Calendar className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Starting
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            16 November
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            Mon • Wed • Fri
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Clock className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Class Time
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            6:30 – 7:30 PM
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            IST (Evening)
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Video className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Format
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            Online Classes
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            Live &amp; Interactive
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-wellness-surface/80 border border-wellness-border flex flex-col justify-between hover:bg-wellness-surface transition-colors shadow-xs">
          <div className="flex items-center gap-2 text-wellness-primary mb-1.5">
            <Hourglass className="w-4 h-4 text-wellness-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted">
              Duration
            </span>
          </div>
          <span className="text-sm sm:text-base font-bold text-wellness-dark leading-tight">
            1 Full Month
          </span>
          <span className="text-[11px] text-wellness-muted font-medium mt-0.5">
            12 Live Sessions
          </span>
        </div>
      </div>

      {/* Special Webinar Offer Box (Matching Image Exactly) */}
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-wellness-dark via-wellness-primaryDark to-wellness-primary text-white shadow-premium-lg border-2 border-wellness-gold/40 overflow-hidden">
        {/* Glow & Decorative border */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-wellness-gold/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wellness-gold/25 border border-wellness-gold/50 text-wellness-goldLight text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-wellness-goldLight" />
              ★ SPECIAL WEBINAR OFFER ★
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/30 text-emerald-200 text-xs font-extrabold uppercase tracking-wide border border-emerald-400/40">
                SAVE Rs. 1000!
              </span>
            </div>
            <p className="text-xs text-gray-200 font-medium">
              Limited-time offer for webinar attendees • Enrol now &amp; save!
            </p>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-6">
            <div className="text-xs text-gray-300 font-semibold tracking-wider uppercase">
              Regular Fee: <span className="line-through text-red-300 font-bold">Rs. 2500/-</span>
            </div>
            <div className="text-xs font-bold text-wellness-goldLight uppercase tracking-wider mt-0.5">
              TODAY WEBINAR SPECIAL:
            </div>
            <div className="text-3xl sm:text-4xl font-black text-wellness-goldLight font-mono tracking-tight drop-shadow-sm">
              Rs. 1500/-
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-wellness-gold" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-wellness-dark font-serif tracking-tight">
              WHAT YOU&apos;LL LEARN
            </h2>
          </div>
          <span className="text-xs font-bold text-wellness-primary uppercase tracking-wider hidden sm:inline-block">
            Curriculum Highlights
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {coreModules.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-wellness-cream/90 border border-wellness-border/70 hover:border-wellness-gold/50 hover:bg-white transition-all shadow-xs group"
            >
              <div className="mt-0.5 w-6 h-6 rounded-full bg-wellness-emeraldBg text-wellness-primary flex items-center justify-center shrink-0 group-hover:bg-wellness-primary group-hover:text-white transition-colors">
                <CheckCircle className="w-4 h-4" />
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

      {/* Bottom Tagline & Trust Badges */}
      <div className="space-y-3 pt-2 border-t border-wellness-border/60">
        <div className="p-3.5 rounded-2xl bg-wellness-emeraldBg/50 border border-wellness-primary/20 text-center">
          <p className="text-sm sm:text-base font-serif font-bold text-wellness-primary italic">
            &ldquo;Breathe with Awareness. Practise with Purpose.&rdquo;
          </p>
          <span className="text-[11px] font-bold tracking-widest text-wellness-dark uppercase mt-0.5 block">
            YOGA REGIME
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-wellness-muted font-medium">
            <Award className="w-4 h-4 text-wellness-gold shrink-0" />
            <span>Master Led Live Guidance</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-wellness-muted font-medium">
            <ShieldCheck className="w-4 h-4 text-wellness-primary shrink-0" />
            <span>Structured 1-Month Progression</span>
          </div>
        </div>
      </div>
    </div>
  );
}
