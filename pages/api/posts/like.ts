import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pId, likedBy } = req.body

  try {
    const query = await prisma.likeRef
      .create({
        data: {
          pId,
          likedBy,
        },
      })
      .then(async () => {
        await prisma.post.update({
          where: { id: pId },
          data: {
            likecount: { increment: 1 },
          },
        })
      })
    res.send({ ...states.success, query })
  } catch (error) {
    console.log(error)

    res.send({ ...states.error })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}
