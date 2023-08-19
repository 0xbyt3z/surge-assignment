import Wrapper from '@/components/Wrapper'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { data } from '@/lib/data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: data.app_name,
  description: data.app_description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo/tick-48.svg" type="image/svg" />
      </head>
      <body className={cn('h-auto w-screen', inter.className)}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}
