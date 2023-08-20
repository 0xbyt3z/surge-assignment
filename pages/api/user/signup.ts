import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fname, lname, email, handle, password } = req.body
  try {
    const query = await prisma.user.create({
      data: { email, name: `${fname} ${lname}`, handle, password },
      select: {
        handle: true,
      },
    })
    res.send({ ...states.success, query })
  } catch (error) {
    res.send({ ...states.error })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}
