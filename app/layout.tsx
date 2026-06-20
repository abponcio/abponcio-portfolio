import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Anthony Bryle Poncio — Product Engineering Manager",
  description:
    "I lead people, simplify systems, and grow businesses. Engineering manager at Hello Chef, Dubai.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Anthony Bryle Poncio",
    description: "I lead people, simplify systems, and grow businesses.",
    url: "https://abponcio.com",
    siteName: "ABP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Bryle Poncio",
    description: "I lead people, simplify systems, and grow businesses.",
  },
  metadataBase: new URL("https://abponcio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
