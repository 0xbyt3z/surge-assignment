import { data } from '@/lib/data'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import FirstLetterLogo from './firstletterlogo'
import Link from 'next/link'

function Nav() {
  const { data: session, status } = useSession()
  const router = useRouter()
  return (
    <>
      <div className="sticky top-0 flex h-16 w-full items-center justify-between bg-white">
        <div className="flex h-full w-auto items-center">
          {/* logo */}
          <div className="flex items-center gap-x-5">
            {/* I usuallly provide the actual size of the image and resize the image using styling */}
            {/* <Image src={'/logo/tick-48.svg'} alt="logo" width={48} height={48} className="h-8 w-8" />
            <span className="ml-2 font-bold tracking-tight">{data.app_name}</span> */}
            <Link href={'/'} className="text-sm">
              Home
            </Link>
            <Link href={'/posts'} className="text-sm">
              Posts
            </Link>
          </div>
        </div>
        <div className="flex h-full w-auto items-center">
          {status == 'authenticated' ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <FirstLetterLogo />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="right-0">
                  <DropdownMenuItem className="flex flex-col items-start">
                    <span className="text-xs text-gray-500">Logged in as :</span> <span>{session?.user.name?.split(' ')[0]}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={'/profile'} className="h-full w-full">
                      Profile
                    </Link>
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
