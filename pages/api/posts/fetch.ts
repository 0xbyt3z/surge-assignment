import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cursor } = req.body
  console.log(cursor)

  const limit = 2
  try {
    if (cursor) {
      const posts = await prisma.post.findMany({
        cursor: { id: cursor },
        take: limit,
        skip: 1,
        orderBy: [{ date: 'desc' }, { likecount: 'desc' }],
        include: {
          user: { select: { name: true, image: true, handle: true } },
        },
      })
      let isEnd = posts.length < limit ? true : false
      res.send({ ...states.success, posts, cursor: posts[posts.length - 1].id, isEnd })
    } else {
      const posts = await prisma.post.findMany({
        take: limit,
        orderBy: [{ date: 'desc' }, { likecount: 'desc' }],
        include: {
          user: { select: { name: true, image: true, handle: true } },
        },
      })
      res.send({ ...states.success, posts, cursor: posts[posts.length - 1].id })
    }
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
