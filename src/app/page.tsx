'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <div className="h-auto w-full">
        <h1 className="mb-2 mt-36 text-5xl font-extrabold tracking-tight">
          {"Discover what's"}
          <br />
          {' around you.'}
        </h1>
        <p className="mb-5 w-2/3 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis metus erat, quis auctor mauris ultrices eget. Nunc scelerisque arcu nulla, vel efficitur augue rhoncus eget. Cras semper
          quam ut nulla tincidunt.
        </p>

        <Button onClick={() => router.push('/posts')} variant={'outline'}>
          View Posts
        </Button>
      </div>
    </>
  )
}
