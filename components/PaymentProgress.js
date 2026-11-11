import React from "react";
import { CheckCircle, Loader2, ShieldCheck } from "lucide-react";

export default function PaymentProgress({ stage = 0 }) {
  // stage values:
  // 0: Details validated (0%)
  // 1: Validating details & initializing payment (25%)
  // 2: Secure Razorpay checkout open (50%)
  // 3: Verifying transaction & issuing pass (75%)
  // 4: Enrolment confirmed (100%)

  const stages = [
    { label: "Details Validated", percent: 0 },
    { label: "Initializing Payment", percent: 25 },
    { label: "Checkout Active", percent: 50 },
    { label: "Verifying & Generating Pass", percent: 75 },
    { label: "Enrolled & Confirmed", percent: 100 },
  ];

  const currentPercent = stages[stage]?.percent || 0;

  return (
    <div className="w-full bg-wellness-cream p-4 rounded-2xl border border-wellness-border shadow-inner mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-wellness-primary flex items-center gap-1.5">
          {stage > 0 && stage < 4 && (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-wellness-gold" />
          )}
          {stage === 4 && (
            <CheckCircle className="w-3.5 h-3.5 text-wellness-primary" />
          )}
          {stage === 0 && (
            <ShieldCheck className="w-3.5 h-3.5 text-wellness-primary" />
          )}
          Enrolment &amp; Payment Status
        </span>
        <span className="text-xs font-bold text-wellness-dark font-mono bg-wellness-surface px-2 py-0.5 rounded-md border border-wellness-border">
          {currentPercent}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-wellness-border/70 h-2.5 rounded-full overflow-hidden p-0.5">
        <div
          className="bg-gradient-to-r from-wellness-gold to-wellness-primary h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${Math.max(currentPercent, 4)}%` }}
        />
      </div>

      {/* Stage Description */}
      <div className="mt-2 text-center">
        <p className="text-xs font-medium text-wellness-muted">
          {stage === 0 && "Ready to complete enrolment"}
          {stage === 1 && "Connecting to secure payment gateway..."}
          {stage === 2 && "Razorpay checkout active • Complete your payment"}
          {stage === 3 && "Verifying payment & issuing your BREATHWISE pass..."}
          {stage === 4 && "✓ Enrolment & payment confirmed!"}
        </p>
      </div>
    </div>
  );
}
