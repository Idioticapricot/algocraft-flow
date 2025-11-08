"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { ThemeProvider } from "@/components/theme-provider"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hiddenRoutes = pathname?.startsWith("/build")

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {!hiddenRoutes && <Nav />}
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      {!hiddenRoutes && <Footer />}
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <LayoutContent>{children}</LayoutContent>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
