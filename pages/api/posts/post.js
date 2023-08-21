import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  const { url } = req.body
  try {
    if (session) {
      const post = await prisma.post.create({
        data: { url, uId: session.user.id },
        select: {
          id: true,
        },
      })
      res.send({ ...states.success, post })
    } else {
      throw new Error('Only authenticated users can post')
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
