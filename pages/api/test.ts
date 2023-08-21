import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //const session = await getServerSession(req, res, authOptions)

  const session = await getSession({ req })

  res.send(session?.user.email)
}

export const config = {
  api: {
    bodyParser: true,
  },
}
