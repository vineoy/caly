import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mycalculatorapp.in'),
  title: {
    default: 'MyCalculatorApp - Free Online Calculators',
    template: '%s | MyCalculatorApp',
  },
  description: 'A comprehensive collection of free online calculators for finance, health, math, and more. Fast, accurate, and easy-to-use for all your calculation needs.',
  keywords: ['calculator', 'free calculator', 'online calculator', 'financial calculator', 'health calculator', 'math calculator'],
  openGraph: {
    title: 'MyCalculatorApp - Free Online Calculators',
    description: 'A comprehensive collection of free online calculators for finance, health, math, and more.',
    url: 'https://mycalculatorapp.in',
    siteName: 'MyCalculatorApp',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 800,
        height: 600,
        alt: 'MyCalculatorApp Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCalculatorApp - Free Online Calculators',
    description: 'A comprehensive collection of free online calculators for finance, health, math, and more.',
    images: ['/placeholder-logo.png'],
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
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MyCalculatorApp",
    "url": "https://mycalculatorapp.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mycalculatorapp.in/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E16LLGJHQR"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E16LLGJHQR');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script async defer data-tracking-id="a7ba7f15-d0db-4c4c-9d3c-7918f801c40e" data-api-host="https://folfganwaudmtovkoyka.supabase.co" src="https://mycalculatorapp.in/tracker.js"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
