import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const { cursor } = req.body
  const session = await getServerSession(req, res, authOptions)

  const limit = 2

  try {
    if (cursor) {
      const posts = await prisma.post.findMany({
        cursor: { id: cursor },
        take: limit,
        skip: 1,
        orderBy: [{ date: 'desc' }, { likecount: 'desc' }],
        include: {
          user: { select: { name: true, handle: true } },
          LikeRef: { where: { likedBy: session?.user.id }, select: { likedBy: true } },
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
          LikeRef: { where: { likedBy: session?.user.id }, select: { likedBy: true } },
        },
      })
      res.send({ ...states.success, posts, cursor: posts[posts.length - 1].id })
    }
  } catch (error) {
    console.log(error)

    res.send({ ...states.error })
  }
}
