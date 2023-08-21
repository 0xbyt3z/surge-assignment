import Wrapper from '@/components/wrapper'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { data } from '@/lib/data'
import Script from 'next/script'

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
        <Script src="https://www.google.com/recaptcha/api.js" async defer></Script>
        {/* <Script src="https://www.google.com/recaptcha/api.js"></Script>

        <Script id="captcha">
          {`function onSubmit(token) {
     document.getElementById("demo-form").submit();
   }`}
        </Script> */}
      </head>
      <body className={cn('h-auto w-screen overflow-x-hidden', inter.className)}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}
