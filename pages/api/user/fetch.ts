import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body

  try {
    const query = await prisma.user.findUnique({
      where: { id },
      //select everything ecept password
      select: {
        name: true,
        handle: true,
        email: true,
        image: true,
        id: true,
      },

      //   include: { _count: { select: { Post: { where: { uId: id } }, LikeRef: { where: { likedBy: id } } } } },
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
