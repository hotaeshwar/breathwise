// EmailJS Configuration from User Account
export const EMAILJS_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "nBHOuUM3urTjJRdFd",
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_q9gimgs",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_evuuv7i",
};

// Possible character-case variants for the Public Key
const PUBLIC_KEY_CANDIDATES = [
  EMAILJS_CONFIG.publicKey,
  "nBHOuUM3urTjJRdFd",
].filter(Boolean);

/**
 * Sends a structured confirmation email to the attendee and receiver
 * immediately upon successful transaction using the official EmailJS browser SDK.
 * 
 * @param {Object} registrationData - { fullName, email, countryCode, phone/whatsappNumber }
 * @param {Object} paymentData - { razorpay_payment_id, razorpay_order_id, amount }
 * @returns {Promise<{ success: boolean, error?: string, response?: any }>}
 */
export async function sendRegistrationEmail(registrationData, paymentData) {
  try {
    const fullName = (registrationData?.fullName || "Valued Participant").trim();
    const recipientEmail = (registrationData?.email || "").trim();
    const phone = `${registrationData?.countryCode || "+91"} ${(registrationData?.whatsappNumber || registrationData?.phone || "").trim()}`.trim();
    const paymentId = paymentData?.registrationId || paymentData?.paymentId || paymentData?.razorpay_payment_id || `pay_${Date.now().toString(36).toUpperCase()}`;
    const orderId = paymentData?.orderId || paymentData?.razorpay_order_id || `pass_${Date.now().toString(36).toUpperCase()}`;
    const rawAmt = paymentData?.amount !== undefined && paymentData?.amount !== null ? Number(paymentData.amount) : 1500;
    const amount = rawAmt >= 10000 ? Math.round(rawAmt / 100) : rawAmt;
    const amountDisplay = `₹${amount}`;

    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeFormatted = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (!recipientEmail) {
      return { success: false, error: "No recipient email address provided." };
    }

    // Comprehensive template parameters matching any EmailJS template variable names
    const templateParams = {
      // Sender & Reply fields
      reply_to: "support@yogaregime.com",
      replyTo: "support@yogaregime.com",
      from_name: "Yoga Regime",
      from_email: "support@yogaregime.com",
      sender_name: "Yoga Regime",
      sender_email: "support@yogaregime.com",
      author_name: "Yoga Regime",

      // Email Subjects
      subject: `Enrolment Confirmed: BREATHWISE (1-Month Breathing & Pranayama Program) - ${fullName}`,
      email_subject: `Enrolment Confirmed: BREATHWISE (1-Month Breathing & Pranayama Program) - ${fullName}`,
      mail_subject: `Enrolment Confirmed: BREATHWISE (1-Month Breathing & Pranayama Program) - ${fullName}`,
      title: "BREATHWISE Program Enrolment & Receipt",

      // Recipient fields
      to_name: fullName,
      to_email: recipientEmail,
      user_name: fullName,
      user_email: recipientEmail,
      recipient_email: recipientEmail,
      email: recipientEmail,
      name: fullName,
      full_name: fullName,
      attendee_name: fullName,
      contact_number: phone,
      phone_number: phone,
      phone: phone,

      // Program Details
      workshop_title: "BREATHWISE",
      workshop_subtitle: "1-Month Breathing & Pranayama Program",
      workshop_name: "BREATHWISE - 1-Month Breathing & Pranayama Program",
      workshop_date: "Starting 16 November (Mon • Wed • Fri)",
      workshop_time: "6:30 PM – 7:30 PM IST",
      workshop_duration: "1 Month (12 Live Guided Classes)",
      mentor: "Yoga Regime Master Faculty",
      instructor: "Yoga Regime Master Faculty",
      instructor_name: "Yoga Regime Master Faculty",
      teacher_name: "Yoga Regime Master Faculty",
      host: "Yoga Regime Team",
      host_name: "Yoga Regime Team",
      speaker: "Yoga Regime Master Faculty",
      joining_link: "Live class joining link and WhatsApp community access will be sent prior to the first session on 16 November.",

      // Registration & Payment Details
      amount_paid: amountDisplay,
      amount: amountDisplay,
      fee: amountDisplay,
      price: amountDisplay,
      cost: amountDisplay,
      currency: "INR",
      registration_id: paymentId,
      payment_id: paymentId,
      razorpay_payment_id: paymentId,
      order_id: orderId,
      transaction_id: paymentId,
      pass_reference: orderId,
      payment_date: `${dateFormatted} at ${timeFormatted}`,
      date: dateFormatted,
      time: timeFormatted,
      status: "PAID & ENROLLED",

      // Organizer & Team
      organizer_name: "Yoga Regime Team",
      organizer_email: "support@yogaregime.com",
      support_email: "support@yogaregime.com",
      support_phone: "+91 98769 63204",

      // Formatted Message Body
      message: `Dear ${fullName},\n\nCongratulations! Your enrolment in BREATHWISE - 1-Month Breathing & Pranayama Program is confirmed!\n\nProgram Details:\n- Program: BREATHWISE (1-Month Breathing & Pranayama Program)\n- Starting Date: 16 November\n- Schedule: Monday • Wednesday • Friday\n- Time: 6:30 PM – 7:30 PM IST\n- Fee Paid: ${amountDisplay} (Webinar Special Offer)\n- Payment ID: ${paymentId}\n\nTagline: Breathe with Awareness. Practise with Purpose.\n\nWe look forward to guiding your practice!\n\nYoga Regime Team`,
    };

    if (typeof window === "undefined") {
      return { success: false, error: "EmailJS must run in browser client." };
    }

    const serviceId = EMAILJS_CONFIG.serviceId || "service_q9gimgs";
    const templateId = EMAILJS_CONFIG.templateId || "template_evuuv7i";

    let lastError = null;

    let emailjsModule;
    try {
      emailjsModule = await import("@emailjs/browser");
    } catch (importErr) {
      console.warn("Could not import @emailjs/browser:", importErr);
      return { success: false, error: "EmailJS SDK not available." };
    }
    const emailjs = emailjsModule?.default || emailjsModule;

    // Try sending with public key candidates
    for (const pKey of PUBLIC_KEY_CANDIDATES) {
      try {
        const result = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          pKey
        );

        if (result && (result.status === 200 || result.text === "OK")) {
          console.log("EmailJS Sent Successfully to", recipientEmail, ":", result.text);
          return { success: true, response: result };
        }
      } catch (sendError) {
        lastError = sendError;
        // If not account error, don't keep trying variations
        if (sendError?.text !== "Account not found" && sendError?.status !== 404) {
          break;
        }
      }
    }

    console.warn("EmailJS send notice:", lastError?.text || lastError?.message || lastError);
    return {
      success: false,
      error: lastError?.text || lastError?.message || "EmailJS template pending configuration",
    };
  } catch (error) {
    console.warn("sendRegistrationEmail error:", error);
    return { success: false, error: error.message };
  }
}
