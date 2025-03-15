import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RSS Feed Publisher",
  description: "Browse and access all available RSS feeds",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <main>{children}</main>
      </body>
    </html>
  )
}



import './globals.css'