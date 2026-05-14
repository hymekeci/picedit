import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Picedit — Free screenshot beautifier | Add backgrounds, frames & shadows",
  description:
    "Make your screenshots beautiful for free. Add gradient backgrounds, device frames, shadows, and export for Twitter, LinkedIn, Instagram. No signup, no watermark. 100% private — runs in your browser.",
  keywords: [
    "screenshot beautifier",
    "screenshot editor",
    "screenshot mockup",
    "screenshot background",
    "screenshot tool free",
    "beautiful screenshots",
    "screenshot to mockup",
    "gradient background generator",
    "device frame mockup",
    "social media image tool",
    "picedit",
  ],
  authors: [{ name: "Picedit" }],
  openGraph: {
    title: "Picedit — Free screenshot beautifier",
    description:
      "Add stunning backgrounds, device frames, and shadows to your screenshots. Free, private, no signup.",
    type: "website",
    locale: "en_US",
    siteName: "Picedit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Picedit — Free screenshot beautifier",
    description:
      "Make your screenshots beautiful. Gradient backgrounds, device frames, social media presets. 100% free & private.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://picedit.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
