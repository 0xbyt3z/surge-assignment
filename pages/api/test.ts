import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //works but cannot use with typescript. must find a solution
  //const session = await getServerSession(req, res, authOptions)

  //getSession works when fine
  //but fails and produce errors when called from other routes
  //cannot figure out what causes the issue
  //until a fix user session will be passed from the client side
  const session = await getSession({ req })

  res.send(session?.user.email)
}

export const config = {
  api: {
    bodyParser: true,
  },
}
