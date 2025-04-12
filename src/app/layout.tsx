import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import ProgressBar from '@/components/Layout/ProgressBar'


import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { AuthProvider } from '@/context/AuthContext'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Aka's Portfolio | Developer & Creator",
  description: "Professional portfolio of Aka, a passionate junior developer, student, and bot creator. Explore projects, social media, and more.",
  keywords: ['developer', 'portfolio', 'web development', 'bot creator', 'student', 'programming'],
  authors: [{ name: 'Aka', url: 'https://github.com/akadev' }],
  creator: 'Aka',
  publisher: 'Aka',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Aka's Portfolio | Developer & Creator",
    description: "Professional portfolio of Aka, a passionate junior developer, student, and bot creator. Explore projects, social media, and more.",
    url: 'https://aka-portfolio.vercel.app',
    siteName: "Aka's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aka's Portfolio | Developer & Creator",
    description: "Professional portfolio of Aka, a passionate junior developer, student, and bot creator. Explore projects, social media, and more.",
    creator: '@akadev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ProgressBar />
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>

            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
