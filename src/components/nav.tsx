import { data } from '@/lib/data'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function Nav() {
  const { data: session, status } = useSession()
  const router = useRouter()
  return (
    <>
      <div className="sticky top-0 flex h-16 w-full items-center justify-between bg-white">
        <div className="flex h-full w-auto items-center">
          {/* logo */}
          <div className="flex items-center">
            {/* I usuallly provide the actual size of the image and resize the image using styling */}
            <Image src={'/logo/tick-48.svg'} alt="logo" width={48} height={48} className="h-8 w-8" />
            <span className="ml-2 font-bold tracking-tight">{data.app_name}</span>
          </div>
        </div>
        <div className="flex h-full w-auto items-center">
          {status == 'authenticated' ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500  to-green-300 outline-none"></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <span className="text-xs text-gray-500">Logged in as :</span> <span>{session?.user.name?.split(' ')[0]}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant={'secondary'} onClick={() => router.push('/login')}>
                <span className="text-card-foreground">Login</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Nav
