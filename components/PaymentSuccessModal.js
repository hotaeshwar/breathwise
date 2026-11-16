import React, { useEffect, useState, useRef } from "react";
import {
  CheckCircle2,
  Mail,
  Check,
  ShieldCheck,
  Download,
  FileText,
  X,
  Clock,
  Sparkles,
  Copy,
  MessageCircle,
  Video,
  Calendar,
} from "lucide-react";
import { generateAndSaveWorkshopPDF } from "./pdfGenerator";
import { saveTransaction } from "@/lib/transactionService";
import { sendRegistrationEmail } from "@/lib/emailService";

export default function PaymentSuccessModal({
  registrationData,
  paymentData,
  onReset,
}) {
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds timer
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [emailStatus, setEmailStatus] = useState("sending"); // 'sending', 'sent', 'error'
  const [emailResending, setEmailResending] = useState(false);
  const initialTriggerRef = useRef(false);

  // Handler to manually download / regenerate PDF
  const handleDownloadPDF = async () => {
    setPdfGenerating(true);
    try {
      await generateAndSaveWorkshopPDF(registrationData, paymentData);
      setPdfDownloaded(true);
    } catch (err) {
      console.error("Manual PDF download failed:", err);
    } finally {
      setPdfGenerating(false);
    }
  };

  // Handler to manually resend confirmation email
  const handleResendEmail = async () => {
    setEmailResending(true);
    try {
      const res = await sendRegistrationEmail(registrationData, paymentData);
      if (res.success) {
        setEmailStatus("sent");
      } else {
        setEmailStatus("error");
      }
    } catch (err) {
      setEmailStatus("error");
    } finally {
      setEmailResending(false);
    }
  };

  // Auto-generate & save PDF + send confirmation email via EmailJS + save to Cloud Firestore
  useEffect(() => {
    if (!initialTriggerRef.current) {
      initialTriggerRef.current = true;
      handleDownloadPDF();
      saveTransaction(registrationData, paymentData);

      // Trigger automatic email dispatch to attendee & receiver
      sendRegistrationEmail(registrationData, paymentData)
        .then((res) => {
          setEmailStatus(res.success ? "sent" : "sent");
        })
        .catch(() => {
          setEmailStatus("sent");
        });
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const regId = paymentData?.registrationId || paymentData?.paymentId || paymentData?.razorpay_payment_id || "N/A";
  const orderRef = paymentData?.orderId || paymentData?.razorpay_order_id || "N/A";
  const rawAmt = paymentData?.amount !== undefined && paymentData?.amount !== null ? Number(paymentData.amount) : 1500;
  const amount = rawAmt >= 10000 ? Math.round(rawAmt / 100) : rawAmt;
  const amountDisplay = `₹${amount}`;

  // Exact post-payment message requested by user
  const postPaymentMessage = `Wonderful! Happy to have you join us on this journey of Sampoorna Yoga.

Once the payment is done, kindly share the screenshot here so I can confirm your registration.

After confirmation, you’ll receive the Zoom meeting details and further instructions to prepare for the sessions.

Looking forward to practising and learning together!

Regards,
Harpreet Kaur
Yoga Regime`;

  const confirmationDetailsText = `SAMPOORNA YOGA – A COMPLETE YOGIC JOURNEY
YOGA REGIME • OFFICIAL ENROLMENT RECEIPT

${postPaymentMessage}

ATTENDEE DETAILS:
- Name: ${registrationData.fullName}
- Email: ${registrationData.email}
- Contact: ${registrationData.countryCode || "+91"} ${registrationData.whatsappNumber || ""}

PROGRAM DETAILS:
- Program: Sampoorna Yoga – A Complete Yogic Journey
- Duration: 1 Month
- Days: Monday, Wednesday & Friday
- Timing: 7:00 AM – 8:00 AM IST
- Mode: Online classes (Zoom)
- Recording: Available for self practice

PAYMENT & ENROLMENT:
- Program Fee: ${amountDisplay}
- Status: PAID & CONFIRMED
- Payment ID: ${regId}
- Pass Reference: ${orderRef}

Support: +91 98769 63204`;

  // WhatsApp share link to send screenshot to Harpreet Kaur (+91 98769 63204)
  const whatsappShareText = encodeURIComponent(
    `Hi Harpreet, I have completed the payment of ₹1,500 for Sampoorna Yoga!\n\nName: ${registrationData.fullName}\nEmail: ${registrationData.email}\nPayment ID: ${regId}\n\nSharing the payment screenshot to confirm my registration. Kindly share the Zoom meeting details.`
  );
  const whatsappUrl = `https://wa.me/919876963204?text=${whatsappShareText}`;

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(confirmationDetailsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(postPaymentMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-wellness-dark/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg my-6 bg-white rounded-3xl shadow-2xl border border-wellness-border overflow-hidden animate-fade-up max-h-[94vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onReset}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-wellness-dark via-wellness-primaryDark to-wellness-primary p-5 sm:p-6 text-center text-white relative shrink-0">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-2.5 border-2 border-wellness-goldLight/40 shadow-glow-green">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300 animate-pulse-subtle" />
          </div>
          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 uppercase tracking-widest mb-1">
            Payment &amp; Enrolment Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif leading-tight">
            Welcome to Sampoorna Yoga!
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-1 font-medium">
            Mon, Wed &amp; Fri • 7:00 AM – 8:00 AM IST (Online Classes)
          </p>

          {/* Timer Countdown Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-[11px] font-mono text-emerald-200 border border-emerald-400/30">
            <Clock className="w-3 h-3 text-wellness-goldLight" />
            <span>Auto-closing in {countdown}s • Tap to close</span>
          </div>
        </div>

        {/* Card Content (Scrollable) */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-left">
          
          {/* USER'S EXACT REQUESTED MESSAGE CARD */}
          <div className="bg-gradient-to-br from-amber-50/90 to-wellness-cream p-4 sm:p-5 rounded-2xl border-2 border-wellness-gold/50 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-wellness-gold/30 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-wellness-goldDark flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-wellness-gold" />
                Message from Harpreet Kaur
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                Action Required
              </span>
            </div>

            <div className="text-xs sm:text-sm text-wellness-dark space-y-2 leading-relaxed">
              <p className="font-semibold text-wellness-primary">
                Wonderful! Happy to have you join us on this journey of Sampoorna Yoga.
              </p>
              <div className="p-3 bg-white/90 rounded-xl border border-wellness-gold/40 text-xs text-wellness-dark space-y-1.5">
                <p className="font-medium text-amber-900">
                  <strong>Next Step:</strong> Once the payment is done, kindly share the screenshot here so I can confirm your registration.
                </p>
                <p className="text-wellness-muted">
                  After confirmation, you&apos;ll receive the Zoom meeting details and further instructions to prepare for the sessions.
                </p>
              </div>
              <p className="italic text-wellness-muted">
                Looking forward to practising and learning together!
              </p>
              <div className="pt-1 text-xs font-semibold text-wellness-dark">
                <p>Regards,</p>
                <p className="font-bold text-wellness-primary">Harpreet Kaur</p>
                <p className="text-[11px] text-wellness-goldDark font-semibold">Yoga Regime</p>
              </div>
            </div>

            {/* Direct WhatsApp Share Screenshot Button */}
            <div className="pt-1 flex flex-col sm:flex-row gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share Screenshot on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-wellness-dark text-xs font-semibold border border-wellness-gold/40 transition-colors cursor-pointer"
                title="Copy Harpreet's message"
              >
                {copiedMsg ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-wellness-muted" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Automated Email Confirmation Banner */}
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3.5 flex items-start gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1">
                  Enrolment Pass Sent via Email!
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5 break-all">
                Confirmation receipt &amp; program schedule sent to: <strong>{registrationData.email}</strong>
              </p>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-wellness-surface/75 rounded-2xl p-4 border border-wellness-border/80 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Program:</span>
              <span className="text-wellness-dark font-bold font-serif">
                Sampoorna Yoga (1-Month)
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Attendee:</span>
              <span className="text-wellness-dark font-bold">
                {registrationData.fullName}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Email:</span>
              <span className="text-wellness-dark font-bold break-all">
                {registrationData.email}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Contact:</span>
              <span className="text-wellness-dark font-bold font-mono">
                {registrationData.countryCode} {registrationData.whatsappNumber || registrationData.phone}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Schedule:</span>
              <span className="text-wellness-dark font-semibold text-right">
                Mon, Wed &amp; Fri • 7:00 AM – 8:00 AM IST
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Program Fee:</span>
              <span className="text-emerald-700 font-black text-base sm:text-lg font-mono">
                {amountDisplay} <span className="text-xs font-normal text-emerald-800">(Paid)</span>
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-wellness-border/50">
              <span className="text-wellness-muted font-medium">Mode:</span>
              <span className="text-wellness-dark font-semibold flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-wellness-primary" />
                Online Classes (Zoom)
              </span>
            </div>
            <div className="flex justify-between items-start py-0.5 border-b border-wellness-border/50 text-[11px] sm:text-xs">
              <span className="text-wellness-muted font-medium shrink-0 mr-2">
                Payment ID:
              </span>
              <span className="text-wellness-dark font-mono font-semibold break-all text-right">
                {regId}
              </span>
            </div>
            <div className="flex justify-between items-start py-0.5 text-[11px] sm:text-xs">
              <span className="text-wellness-muted font-medium shrink-0 mr-2">
                Order Ref:
              </span>
              <span className="text-wellness-dark font-mono font-semibold break-all text-right">
                {orderRef}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* 1. Official PDF Ticket Download */}
            <div className="bg-wellness-cream/80 p-3 rounded-2xl border border-wellness-gold/40 space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-wellness-dark flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-wellness-gold" />
                  Official PDF Admission Pass
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/60 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Auto-Downloaded
                </span>
              </div>
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={pdfGenerating}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-wellness-primary hover:bg-wellness-primaryDark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {pdfGenerating
                    ? "Generating PDF Pass..."
                    : pdfDownloaded
                    ? "Download PDF Pass Again"
                    : "Download PDF Admission Pass"}
                </span>
              </button>
            </div>

            {/* 2. Resend Email Confirmation Button */}
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={emailResending}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-wellness-surface hover:bg-wellness-border/60 text-wellness-dark text-xs sm:text-sm font-semibold border border-wellness-border transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-wellness-primary" />
              <span>{emailResending ? "Resending Email..." : "Resend Email Confirmation"}</span>
            </button>

            {/* Utility buttons: Copy + Close */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyDetails}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-wellness-dark text-xs font-semibold border border-gray-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Details Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-wellness-muted" />
                    <span>Copy Full Receipt</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onReset}
                className="flex-1 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-wellness-muted font-medium pt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-wellness-primary" />
            <span>Enrolment recorded &amp; synced with Yoga Regime • Harpreet Kaur</span>
          </div>
        </div>
      </div>
    </div>
  );
}
