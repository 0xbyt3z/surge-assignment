import { NextApiRequest, NextApiResponse } from 'next'
import { prisma, states } from '@/lib/prisma'
import z from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  const { confirm, password, current } = req.body

  try {
    const query = await prisma.user.findUnique({
      where: { id: session?.user.id },
      //select everything ecept password
      select: {
        password: true,
      },
    })

    if (query?.password === current) {
      //if the passwords are true change the password
      await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          password: password,
        },
      })
    } else {
      res.send({ ...states.error, msg: 'Current password do not match' })
    }
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
