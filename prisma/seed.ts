import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      id: '0000000000000000000000000',
      handle: 'admin',
      password: 'admin123',
      name: 'Admin',
      email: 'admin@gmail.com',
    },
  })
  const post = await prisma.post.create({
    data: {
      uId: '0000000000000000000000000',
      url: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  })

  console.log('Done---->>\nSeed the database with a user and a welcome post')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
