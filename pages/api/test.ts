import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fname, lname, email, handle, password } = req.body
  try {
    const { key, password } = { key: 'theekshana', password: '123!@#qweQW' }
    const user = await prisma.user.findFirst({
      where: {
        AND: [{ OR: [{ email: key }, { handle: key }] }, { password }],
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    })
    res.send({ ...states.success, user })
  } catch (error) {
    res.send({ ...states.error })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}
