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
      // Sender fields
      from_name: "Harpreet Kaur • Yoga Regime",
      sender_name: "Harpreet Kaur",
      author_name: "Harpreet Kaur • Yoga Regime",

      // Email Subjects
      subject: `Enrolment Confirmed: Sampoorna Yoga (A Complete Yogic Journey) - ${fullName}`,
      email_subject: `Enrolment Confirmed: Sampoorna Yoga (A Complete Yogic Journey) - ${fullName}`,
      mail_subject: `Enrolment Confirmed: Sampoorna Yoga (A Complete Yogic Journey) - ${fullName}`,
      title: "Sampoorna Yoga Program Enrolment & Receipt",

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
      workshop_title: "Sampoorna Yoga",
      workshop_subtitle: "A Complete Yogic Journey",
      workshop_name: "Sampoorna Yoga – A Complete Yogic Journey",
      workshop_date: "Monday, Wednesday & Friday",
      workshop_time: "7:00 AM – 8:00 AM IST",
      workshop_duration: "1 Month (Online Classes)",
      mentor: "Harpreet Kaur",
      instructor: "Harpreet Kaur",
      instructor_name: "Harpreet Kaur",
      teacher_name: "Harpreet Kaur",
      host: "Yoga Regime",
      host_name: "Harpreet Kaur • Yoga Regime",
      speaker: "Harpreet Kaur",
      joining_link: "Once your payment screenshot is verified, Zoom meeting details and further preparation instructions will be shared.",

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
      organizer_name: "Yoga Regime",
      support_phone: "+91 98769 63204",

      // Formatted Message Body
      message: `Dear ${fullName},\n\nWonderful! Happy to have you join us on this journey of Sampoorna Yoga.\n\nYour enrollment payment of ${amountDisplay} is received.\n\nOnce the payment is done, kindly share the screenshot on WhatsApp (+91 98769 63204) so I can confirm your registration.\n\nAfter confirmation, you’ll receive the Zoom meeting details and further instructions to prepare for the sessions.\n\nProgram Details:\n- Program: Sampoorna Yoga – A Complete Yogic Journey\n- Duration: 1 Month\n- Days: Monday, Wednesday & Friday\n- Timing: 7:00 AM – 8:00 AM IST\n- Mode: Online classes (Zoom)\n- Program Fee: ${amountDisplay}\n- Recording Available for Self Practice\n\nLooking forward to practising and learning together!\n\nRegards,\nHarpreet Kaur\nYoga Regime`,
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
