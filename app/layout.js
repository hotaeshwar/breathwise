import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://breathwise.yogaregime.com"),
  title: "Sampoorna Yoga – A Complete Yogic Journey | Yoga Regime",
  description:
    "Join our 1-Month Online Sampoorna Yoga Program with Harpreet Kaur. Mon, Wed & Fri (7:00 AM – 8:00 AM IST). Shatkarma, Asana, Pranayama, Mudra, Bandha & Meditation. Program Fee: ₹1,500.",
  keywords: [
    "Sampoorna Yoga",
    "Yoga Regime",
    "Harpreet Kaur",
    "Shatkarma",
    "Asana",
    "Pranayama",
    "Mudra",
    "Bandha",
    "Meditation",
    "Online Yoga Classes",
    "Yogic Journey",
  ],
  authors: [{ name: "Harpreet Kaur • Yoga Regime", url: "https://breathwise.yogaregime.com" }],
  creator: "Yoga Regime",
  publisher: "Yoga Regime",
  alternates: {
    canonical: "https://breathwise.yogaregime.com",
  },
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    title: "Sampoorna Yoga – A Complete Yogic Journey",
    description:
      "A one-month online yoga program designed to help you explore yoga beyond physical postures. Mon, Wed & Fri (7:00 AM – 8:00 AM IST). Fee: ₹1,500.",
    url: "https://breathwise.yogaregime.com",
    siteName: "Yoga Regime",
    images: [
      {
        url: "https://breathwise.yogaregime.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sampoorna Yoga: A Complete Yogic Journey by Yoga Regime",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sampoorna Yoga – A Complete Yogic Journey",
    description:
      "1-Month Online Yoga Program with Harpreet Kaur. Mon, Wed & Fri (7:00 AM – 8:00 AM IST). Program Fee: ₹1,500.",
    images: ["https://breathwise.yogaregime.com/og-image.jpg"],
    creator: "@yogaregime",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* WhatsApp & Open Graph Preview Meta Tags */}
        <meta property="og:title" content="Sampoorna Yoga – A Complete Yogic Journey" />
        <meta
          property="og:description"
          content="A one-month online yoga program designed to help you explore yoga beyond physical postures. Mon, Wed & Fri (7:00 AM – 8:00 AM IST). Fee: ₹1,500."
        />
        <meta property="og:image" content="https://breathwise.yogaregime.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://breathwise.yogaregime.com/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sampoorna Yoga: A Complete Yogic Journey by Yoga Regime" />
        <meta property="og:url" content="https://breathwise.yogaregime.com/" />
        <meta property="og:site_name" content="Yoga Regime" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sampoorna Yoga – A Complete Yogic Journey" />
        <meta
          name="twitter:description"
          content="1-Month Online Yoga Program with Harpreet Kaur. Mon, Wed & Fri (7:00 AM – 8:00 AM IST). Program Fee: ₹1,500."
        />
        <meta name="twitter:image" content="https://breathwise.yogaregime.com/og-image.jpg" />

        {/* Brand Theme & Favicons */}
        <meta name="theme-color" content="#1A4D3E" />
        <meta name="msapplication-TileColor" content="#1A4D3E" />
        <link rel="icon" type="image/png" href="/logo1.png" />
        <link rel="apple-touch-icon" href="/logo1.png" />
        <link rel="canonical" href="https://breathwise.yogaregime.com/" />

        {/* Fonts Preconnect & Stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Razorpay Checkout SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-wellness-bg text-wellness-dark min-h-screen selection:bg-wellness-goldLight selection:text-wellness-primaryDark font-sans">
        {children}
      </body>
    </html>
  );
}
