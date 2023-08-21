import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, image } = req.body

  try {
    const query = await prisma.user.update({
      where: { id },
      data: { image },
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
