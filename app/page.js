import React from "react";
import WorkshopDetails from "@/components/WorkshopDetails";
import RegistrationForm from "@/components/RegistrationForm";
import { Sparkles, Shield, Heart, HelpCircle, PhoneCall, Mail, Wind, Calendar, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-wellness-bg relative overflow-hidden flex flex-col justify-between">
      {/* Background Subtle Gradient & Ambience */}
      <div className="absolute inset-0 bg-ambient-pattern pointer-events-none z-0" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-wellness-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-wellness-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full border-b border-wellness-border/70 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo1.png"
              alt="Yoga Regime Presents BREATHWISE"
              className="h-12 sm:h-14 w-auto max-w-[160px] object-contain drop-shadow-sm transition-transform hover:scale-105"
            />
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-wellness-dark block leading-tight font-serif">
                Yoga Regime
              </span>
              <span className="text-xs text-wellness-goldDark font-semibold uppercase tracking-wider">
                Presents BREATHWISE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-wellness-cream border border-wellness-border text-xs font-semibold text-wellness-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Live 1-Month Program</span>
            </div>
            <a
              href="https://wa.me/919876963204"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-wellness-dark bg-wellness-surface hover:bg-wellness-border border border-wellness-border transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-wellness-primary" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Two-Column Hero / Registration Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 lg:py-12 flex-1 w-full">
        {/* Mobile Header Intro - Visible on Mobile only */}
        <div className="block lg:hidden mb-4 text-center space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-wellness-gold/15 text-wellness-goldDark border border-wellness-gold/30">
            <Sparkles className="w-3 h-3 text-wellness-gold" />
            ★ SPECIAL WEBINAR OFFER • SAVE Rs. 1000 ★
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-wellness-dark tracking-tight font-serif leading-tight uppercase">
            BREATH<span className="text-wellness-primary italic">WISE</span>
          </h1>
          <p className="text-sm font-bold text-wellness-goldDark">
            1-Month Breathing &amp; Pranayama Program
          </p>
          <p className="text-xs text-wellness-muted font-medium italic">
            &ldquo;Understand Your Breath. Transform Your Practice.&rdquo;
          </p>
          <p className="text-xs font-semibold text-wellness-dark pt-0.5">
            Starting 2 November • Mon • Wed • Fri (6:30 PM – 7:30 PM IST)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Registration Card: Appears FIRST on mobile, sticky on right column for desktop */}
          <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-24 animate-fade-up w-full">
            <RegistrationForm />
          </div>

          {/* Workshop Details & Curriculum: Appears at BOTTOM on mobile, left column for desktop */}
          <div className="order-2 lg:order-1 lg:col-span-7 animate-fade-up pt-2 lg:pt-0">
            <WorkshopDetails />
          </div>
        </div>
      </section>

      {/* Bottom Features / Assurance Bar */}
      <section className="relative z-10 border-t border-wellness-border/80 bg-wellness-surface/60 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white border border-wellness-border flex items-center justify-center text-wellness-primary shrink-0 shadow-sm">
                <Calendar className="w-5 h-5 text-wellness-gold" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-wellness-dark uppercase tracking-wider">
                  12 Live Guided Classes
                </h4>
                <p className="text-xs text-wellness-muted">
                  Mon, Wed, Fri • 6:30 PM – 7:30 PM IST (Starting 2 Nov)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white border border-wellness-border flex items-center justify-center text-wellness-primary shrink-0 shadow-sm">
                <Wind className="w-5 h-5 text-wellness-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-wellness-dark uppercase tracking-wider">
                  Complete Yogic Breathing
                </h4>
                <p className="text-xs text-wellness-muted">
                  Diaphragmatic control, pranayama asanas &amp; mind coordination
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white border border-wellness-border flex items-center justify-center text-wellness-primary shrink-0 shadow-sm">
                <Mail className="w-5 h-5 text-wellness-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-wellness-dark uppercase tracking-wider">
                  Instant Enrolment Pass
                </h4>
                <p className="text-xs text-wellness-muted">
                  Razorpay verified receipt &amp; pass sent directly to email
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-wellness-border/80 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-wellness-muted">
          <div className="flex items-center gap-3">
            <img
              src="/logo1.png"
              alt="Yoga Regime Logo"
              className="h-9 w-auto object-contain"
            />
            <p>© {new Date().getFullYear()} Yoga Regime • BREATHWISE 1-Month Program. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-wellness-primary" />
              support@yogaregime.com
            </span>
            <span className="text-wellness-border">•</span>
            <a
              href="/admin"
              className="text-wellness-muted/80 hover:text-wellness-primary font-medium transition-colors"
            >
              Admin Portal
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
