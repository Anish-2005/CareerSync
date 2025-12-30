import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
    default: "CareerSync - Track Your Career Journey",
    template: "%s | CareerSync"
  },
  description: "Sync your career trajectory with intelligent tracking, application management, and real-time insights. Manage job applications, build resumes, and advance your career with AI-powered tools.",
  keywords: ["career tracking", "job applications", "resume builder", "career management", "job search", "professional development", "career analytics"],
  authors: [{ name: "CareerSync Team" }],
  creator: "CareerSync",
  publisher: "CareerSync",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://careersync.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://careersync.app',
    title: 'CareerSync - Track Your Career Journey',
    description: 'Sync your career trajectory with intelligent tracking, application management, and real-time insights.',
    siteName: 'CareerSync',
    images: [
      {
        url: '/csync.png',
        width: 1200,
        height: 630,
        alt: 'CareerSync - Career Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerSync - Track Your Career Journey',
    description: 'Sync your career trajectory with intelligent tracking, application management, and real-time insights.',
    images: ['/csync.png'],
    creator: '@careersync',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/csync.png",
    shortcut: "/csync.png",
    apple: "/csync.png",
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
