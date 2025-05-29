import type React from "react"
import type { Metadata } from "next"
import { Inter, Amiri } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "Eid ul Adha Mubarak 2025 | Islamic Festival Celebration",
  description:
    "Celebrate Eid ul Adha with beautiful greetings, custom card maker, traditional recipes, Islamic calendar, and Qibla finder. Share the joy of the Festival of Sacrifice.",
  keywords:
    "Eid ul Adha, Eid Mubarak, Islamic festival, Qurbani, Hajj, Islamic calendar, Qibla direction, Eid cards, Islamic recipes",
  authors: [{ name: "Uzair Mughal" }],
  openGraph: {
    title: "Eid ul Adha Mubarak 2025",
    description: "Celebrate the Festival of Sacrifice with beautiful greetings and Islamic tools",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eid ul Adha Mubarak 2025",
    description: "Celebrate the Festival of Sacrifice with beautiful greetings and Islamic tools",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 fontSize=%2290%22>🕌</text></svg>"
        />
      </head>
      <body className={`${inter.className} ${amiri.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
