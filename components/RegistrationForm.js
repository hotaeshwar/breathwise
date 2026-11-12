"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  CreditCard,
} from "lucide-react";
import PaymentProgress from "./PaymentProgress";
import PaymentSuccessModal from "./PaymentSuccessModal";
import Toast from "./Toast";
import { saveTransaction } from "@/lib/transactionService";
import { sendRegistrationEmail } from "@/lib/emailService";

const COUNTRY_CODES = [
  { code: "+91", country: "India (IN)", flag: "🇮🇳", digits: 10 },
  { code: "+1", country: "USA / Canada (US/CA)", flag: "🇺🇸", digits: 10 },
  { code: "+44", country: "United Kingdom (UK)", flag: "🇬🇧", digits: 10 },
  { code: "+971", country: "UAE (AE)", flag: "🇦🇪", digits: 9 },
  { code: "+65", country: "Singapore (SG)", flag: "🇸🇬", digits: 8 },
  { code: "+61", country: "Australia (AU)", flag: "🇦🇺", digits: 9 },
  { code: "+49", country: "Germany (DE)", flag: "🇩🇪", digits: 10 },
  { code: "+33", country: "France (FR)", flag: "🇫🇷", digits: 9 },
];

/**
 * Dynamically loads Razorpay checkout.js script if not already on window
 */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RegistrationForm() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    whatsappNumber: "",
    termsAccepted: false,
  });

  // Touched state for immediate inline error feedback
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    whatsappNumber: false,
    termsAccepted: false,
  });

  // Flow State: 'idle' | 'submitting' | 'checkout_open' | 'success' | 'failed'
  const [registrationStatus, setRegistrationStatus] = useState("idle");
  const [paymentStage, setPaymentStage] = useState(0);

  // Success payload
  const [verifiedPaymentData, setVerifiedPaymentData] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: "", type: "info" });
  };

  // Validation Logic
  const validateForm = () => {
    const errors = {};

    // Full Name
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      errors.fullName = "Full name is required.";
    } else if (nameTrimmed.length < 2) {
      errors.fullName = "Name must be at least 2 characters long.";
    }

    // Email
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(emailTrimmed)) {
      errors.email = "Please enter a valid email address.";
    }

    // Mobile Number
    const phoneClean = formData.whatsappNumber.replace(/\D/g, "");
    if (!phoneClean) {
      errors.whatsappNumber = "Mobile number is required.";
    } else if (formData.countryCode === "+91" && phoneClean.length !== 10) {
      errors.whatsappNumber = "Indian mobile number must be exactly 10 digits.";
    } else if (phoneClean.length < 7 || phoneClean.length > 15) {
      errors.whatsappNumber = "Please enter a valid mobile number.";
    }

    // Terms
    if (!formData.termsAccepted) {
      errors.termsAccepted = "Please confirm the program schedule & terms.";
    }

    return errors;
  };

  const formErrors = validateForm();
  const isFormValid = Object.keys(formErrors).length === 0;

  // Handle Field Input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Main Payment & Registration Handler via Razorpay Checkout
  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    // Mark all as touched to display errors if any
    setTouched({
      fullName: true,
      email: true,
      whatsappNumber: true,
      termsAccepted: true,
    });

    const currentErrors = validateForm();
    if (Object.keys(currentErrors).length > 0) {
      const firstError = Object.values(currentErrors)[0];
      showToast(firstError, "warning");
      return;
    }

    try {
      setRegistrationStatus("submitting");
      setPaymentStage(1);
      showToast("Connecting to secure payment gateway...", "info");

      // 1. Ensure Razorpay SDK script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof window === "undefined" || !window.Razorpay) {
        throw new Error("Unable to load Razorpay payment gateway. Please check your internet connection.");
      }

      const razorpayKey =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_Tb4Km1evAI6DKr";
      const cleanPhone = `${formData.countryCode}${formData.whatsappNumber.replace(/\D/g, "")}`;
      const amountInPaise = 1500 * 100; // Rs. 1500 in paise

      // 2. Configure Razorpay Standard Checkout options
      const options = {
        key: razorpayKey,
        amount: amountInPaise,
        currency: "INR",
        name: "Yoga Regime",
        description: "BREATHWISE: 1-Month Breathing & Pranayama Program",
        image: "/logo1.png",
        prefill: {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          contact: cleanPhone,
        },
        notes: {
          program: "BREATHWISE",
          startDate: "16 November",
          schedule: "Mon • Wed • Fri (6:30 PM - 7:30 PM IST)",
          offerPrice: "Rs. 1500 (Save Rs. 1000)",
        },
        theme: {
          color: "#1A4D3E",
          backdrop_color: "#0F2820",
        },
        modal: {
          ondismiss: function () {
            setRegistrationStatus("idle");
            setPaymentStage(0);
            showToast("Payment window closed. You can resume enrolment whenever you are ready.", "info");
          },
          escape: true,
          confirm_close: true,
        },
        handler: async function (response) {
          try {
            setRegistrationStatus("submitting");
            setPaymentStage(3);
            showToast("Payment received! Generating your admission pass...", "info");

            const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
            const orderId = response.razorpay_order_id || `ord_${Date.now()}`;

            const paymentPayload = {
              registrationId: paymentId,
              paymentId: paymentId,
              orderId: orderId,
              razorpay_payment_id: paymentId,
              razorpay_order_id: orderId,
              razorpay_signature: response.razorpay_signature || "",
              amount: 1500,
              currency: "INR",
              status: "CONFIRMED",
            };

            // 1. Save to Cloud Firestore & localStorage
            await saveTransaction(formData, paymentPayload).catch((err) => {
              console.warn("Background saveTransaction error:", err);
            });

            // 2. Dispatch confirmation email via EmailJS
            await sendRegistrationEmail(formData, paymentPayload).catch((err) => {
              console.warn("Background sendRegistrationEmail error:", err);
            });

            // 3. Mark successful
            setPaymentStage(4);
            setVerifiedPaymentData(paymentPayload);
            setRegistrationStatus("success");
            showToast("Enrolment Confirmed! Welcome to BREATHWISE ✓", "success");
          } catch (postPayErr) {
            console.error("Post payment handler error:", postPayErr);
            // Still display success modal since user was charged
            setPaymentStage(4);
            setVerifiedPaymentData({
              registrationId: response.razorpay_payment_id,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || "CONFIRMED",
              amount: 1500,
              status: "CONFIRMED",
            });
            setRegistrationStatus("success");
          }
        },
      };

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on("payment.failed", function (failResponse) {
        console.error("Razorpay payment error:", failResponse.error);
        setRegistrationStatus("failed");
        setPaymentStage(0);
        showToast(
          failResponse.error?.description || "Payment failed or declined. Please try another card/UPI.",
          "error"
        );
      });

      setPaymentStage(2);
      rzpInstance.open();
    } catch (err) {
      console.error("Enrolment initialization error:", err);
      setRegistrationStatus("failed");
      setPaymentStage(0);
      showToast(
        err.message || "Could not launch secure payment. Please try again.",
        "error"
      );
    }
  };

  const handleResetFlow = () => {
    setRegistrationStatus("idle");
    setPaymentStage(0);
    setVerifiedPaymentData(null);
  };

  const isProcessing = registrationStatus === "submitting" || paymentStage > 0;

  // Button text and state
  const getButtonContent = () => {
    switch (registrationStatus) {
      case "submitting":
        return (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white" />
            <span>Processing Enrolment...</span>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>Enrolment Confirmed ✓</span>
          </>
        );
      case "failed":
        return (
          <>
            <span>Retry Payment (₹1,500)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        );
      default:
        return (
          <>
            <CreditCard className="w-5 h-5 text-wellness-goldLight" />
            <span>Proceed to Pay ₹1,500 &amp; Enrol</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        );
    }
  };

  return (
    <div className="relative">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      {/* Registration Success Modal */}
      {registrationStatus === "success" && verifiedPaymentData && (
        <PaymentSuccessModal
          registrationData={formData}
          paymentData={verifiedPaymentData}
          onReset={handleResetFlow}
        />
      )}

      {/* Main Form Glass Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 lg:p-9 shadow-premium-lg border border-wellness-border relative overflow-hidden w-full">
        {/* Card Decorative Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-wellness-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-wellness-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Form Header */}
        <div className="mb-5 space-y-1 relative">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-wellness-goldDark bg-wellness-gold/15 px-3 py-1 rounded-full border border-wellness-gold/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-wellness-gold" />
            Save Rs. 1000 • Webinar Special Offer
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-wellness-dark font-serif">
            Enrol in BREATHWISE
          </h2>
          <p className="text-xs sm:text-sm text-wellness-muted">
            1-Month Program • Starting 16 Nov (Mon, Wed, Fri • 6:30 PM IST)
          </p>
        </div>

        {/* Pricing Summary Callout inside Form */}
        <div className="mb-5 p-3.5 rounded-2xl bg-wellness-cream/90 border border-wellness-border/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-wellness-muted block">
              Program Fee
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-wellness-primary font-mono">
                Rs. 1500/-
              </span>
              <span className="text-xs line-through text-gray-400 font-semibold">
                Rs. 2500/-
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide border border-emerald-300">
              Save Rs. 1000!
            </span>
            <span className="block text-[10px] text-wellness-muted font-medium mt-0.5">
              12 Live Classes
            </span>
          </div>
        </div>

        {/* Payment Progress Bar (active when checking out) */}
        {paymentStage > 0 && (
          <PaymentProgress stage={paymentStage} />
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} noValidate className="space-y-4 sm:space-y-5">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="block text-xs font-bold uppercase tracking-wider text-wellness-dark"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-wellness-muted">
                <User className="w-5 h-5" />
              </div>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                disabled={isProcessing}
                placeholder="e.g. Priya Sharma"
                className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium bg-wellness-cream/70 border ${
                  touched.fullName && formErrors.fullName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-wellness-border focus:border-wellness-primary focus:ring-wellness-primary/20"
                } focus:outline-none focus:ring-2 focus:bg-white text-wellness-dark placeholder:text-gray-400`}
              />
            </div>
            {touched.fullName && formErrors.fullName && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {formErrors.fullName}
              </p>
            )}
          </div>

          {/* Email Address Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-wellness-dark"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-wellness-muted">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                disabled={isProcessing}
                placeholder="e.g. priya@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium bg-wellness-cream/70 border ${
                  touched.email && formErrors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-wellness-border focus:border-wellness-primary focus:ring-wellness-primary/20"
                } focus:outline-none focus:ring-2 focus:bg-white text-wellness-dark placeholder:text-gray-400`}
              />
            </div>
            {touched.email && formErrors.email && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Mobile / WhatsApp Number Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="whatsappNumber"
              className="block text-xs font-bold uppercase tracking-wider text-wellness-dark"
            >
              WhatsApp / Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {/* Country Code Selector */}
              <div className="relative w-32 shrink-0">
                <select
                  id="countryCode"
                  aria-label="Country Code"
                  value={formData.countryCode}
                  onChange={(e) =>
                    handleInputChange("countryCode", e.target.value)
                  }
                  disabled={isProcessing}
                  className="w-full py-3 px-3 rounded-xl text-sm font-semibold bg-wellness-cream/70 border border-wellness-border focus:border-wellness-primary focus:ring-2 focus:ring-wellness-primary/20 focus:outline-none text-wellness-dark cursor-pointer appearance-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-wellness-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Number Input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-wellness-muted">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "whatsappNumber",
                      e.target.value.replace(/[^\d\s-]/g, "")
                    )
                  }
                  onBlur={() => handleBlur("whatsappNumber")}
                  disabled={isProcessing}
                  placeholder={
                    formData.countryCode === "+91"
                      ? "10 digit mobile number"
                      : "Phone number"
                  }
                  maxLength={15}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium bg-wellness-cream/70 border ${
                    touched.whatsappNumber && formErrors.whatsappNumber
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-wellness-border focus:border-wellness-primary focus:ring-wellness-primary/20"
                  } focus:outline-none focus:ring-2 focus:bg-white text-wellness-dark placeholder:text-gray-400 font-mono`}
                />
              </div>
            </div>
            {touched.whatsappNumber && formErrors.whatsappNumber && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {formErrors.whatsappNumber}
              </p>
            )}
          </div>

          {/* Terms & Confirmation Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) =>
                  handleInputChange("termsAccepted", e.target.checked)
                }
                onBlur={() => handleBlur("termsAccepted")}
                disabled={isProcessing}
                className="mt-1 w-4.5 h-4.5 rounded border-wellness-border text-wellness-primary focus:ring-wellness-primary/20 accent-wellness-primary cursor-pointer shrink-0"
              />
              <span className="text-xs text-wellness-muted leading-relaxed">
                I understand classes start on <strong>16 November</strong> (Monday, Wednesday, Friday • 6:30 PM – 7:30 PM IST) and agree to enrol in the 1-Month BREATHWISE Program.
              </span>
            </label>
            {touched.termsAccepted && formErrors.termsAccepted && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1.5 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {formErrors.termsAccepted}
              </p>
            )}
          </div>

          {/* Main Payment CTA Button */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={!isFormValid || isProcessing}
              className={`w-full group relative flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base shadow-premium transition-all duration-300 ${
                !isFormValid || isProcessing
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-wellness-dark via-wellness-primaryDark to-wellness-primary text-white hover:shadow-premium-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
              }`}
            >
              {getButtonContent()}
            </button>

            {/* Micro-copy and Security Badges */}
            <div className="space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-wellness-muted font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-wellness-primary" />
                <span>Instant payment receipt &amp; program pass emailed automatically.</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-wellness-muted/80">
                <Lock className="w-3.5 h-3.5 text-wellness-primary" />
                <span>256-Bit SSL Encrypted • Powered by Razorpay Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
