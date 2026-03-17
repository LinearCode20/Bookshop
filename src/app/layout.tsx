import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theam-provider";
import AppHeader from "@/components/common/app-header";
import AppFooter from "@/components/common/app-footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.BASE_URL ?? "https://www.letmegiveyouthegame.com";

export const metadata : Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/", //Homepage
  },
  title: {
    default: "LET ME GIVE YOU THE GAME",
    template: "%s | LET ME GIVE YOU THE GAME",
  },
  description:
    "A practical manual for modern men. Standards. Discipline. Relationships. Read it, apply it, you adjust.",
  openGraph: {
    title: "Let Me Give You The Game",
    description: "Learn strategies and insights from the book Let Me Give You The Game.",
    url: BASE_URL,
    siteName: "Let Me Give You The Game",
    images: [
      {
        url: `/images/book-cover.png`,
        width: 1200,
        height: 630,
        alt: "Let Me Give You The Game Book Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Let Me Give You The Game",
    description:
      "Learn strategies and insights from the book Let Me Give You The Game.",
    images: ["/images/book-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AppHeader />
          <div className="p-4">{children}</div>
          <AppFooter />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}