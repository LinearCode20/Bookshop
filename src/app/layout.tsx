import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theam-provider";
import AppHeader from "@/components/common/app-header";
import AppFooter from "@/components/common/app-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LET ME GIVE YOU THE GAME",
    template: "%s | LET ME GIVE YOU THE GAME",
  },
  description:"A practical manual for modern men. Standards. Discipline. Relationships. Read it, apply it, you adjust.",

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
        </ThemeProvider>
      </body>
    </html>
  );
}
