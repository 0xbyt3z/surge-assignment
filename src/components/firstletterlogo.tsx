import React from 'react'
import { useSession } from 'next-auth/react'

function FirstLetterLogo() {
  const { data: session } = useSession()
  return (
    <>
      {session?.user.name ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500  to-green-300">
          <span className="text-xl font-medium text-slate-700">{session.user.name[0].toString()}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default FirstLetterLogo
