import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "StreaknFit Blog - Fitness Tips & Workout Routines",
  description: "Discover the latest fitness tips, workout routines, and health insights. Get expert advice on training, nutrition, and wellness to achieve your fitness goals.",
  keywords: "fitness, workout, health, exercise, wellness, training, nutrition, strength training, cardio, yoga, meditation",
  authors: [{ name: "StreaknFit Team" }],
  creator: "StreaknFit",
  publisher: "StreaknFit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://streaknfit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://streaknfit.com',
    siteName: 'StreaknFit Blog',
    title: 'StreaknFit Blog - Fitness Tips & Workout Routines',
    description: 'Discover the latest fitness tips, workout routines, and health insights. Get expert advice on training, nutrition, and wellness to achieve your fitness goals.',
    images: [
      {
        url: '/default-og-image.svg',
        width: 1200,
        height: 630,
        alt: 'StreaknFit Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreaknFit Blog - Fitness Tips & Workout Routines',
    description: 'Discover the latest fitness tips, workout routines, and health insights.',
    images: ['/default-og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LoadingSpinner />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
