'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Nav from './Nav'
import { Toaster } from 'react-hot-toast'

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <div className="flex h-auto w-screen flex-col items-center">
          <div className="h-auto w-1/3">
            <Nav />
            {children}
          </div>
        </div>
        <Toaster toastOptions={{ position: 'bottom-right', duration: 5000 }} />
      </SessionProvider>
    </>
  )
}

export default Wrapper
