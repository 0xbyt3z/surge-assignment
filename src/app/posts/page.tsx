'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import InfiniteScroll from 'react-infinite-scroll-component'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FirstLetterLogo from '@/components/firstletterlogo'
import { cn } from '@/lib/utils'

const postSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  date: z.date(),
  likecount: z.number(),
  user: z.object({
    name: z.string(),
    image: z.string(),
    handle: z.string(),
  }),
  LikeRef: z.array(z.any()),
})

function PostsPage() {
  const [posts, setPosts] = useState<z.infer<typeof postSchema>[]>([])
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [cursor, setCursor] = useState<string>()
  const { data: session, status } = useSession()

  const ref = useRef<HTMLDivElement>(null)

  const [isIntersecting, setIsIntersecting] = useState(false)

  async function fetchData() {
    if (isEnd) {
      // exit the function when all the posts are fetched
      return
    }

    const res = await fetch('/api/posts/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cursor }),
    }).then(res => res.json())
    setCursor(res.cursor)
    if (res.isEnd || res.code == 500) {
      //mark the end of the scroll
      setIsEnd(true)
    }

    if (res.posts != undefined) {
      if (posts.length > 0) {
        setPosts(state => [...state, ...res.posts])
      } else {
        //prevents the first fetched items from repeating
        setPosts([...res.posts])
      }
    }
  }

  useEffect(() => {
    let _ref = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.unobserve(_ref!)
    }
  }, [])

  useEffect(() => {
    if (isIntersecting) {
      fetchData()
    }
  }, [isIntersecting])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="z-10 h-full w-full">
        <TopBar />

        <div id="scroll-area" className="hide-scroll h-[80vh] overflow-y-scroll ">
          {posts.map(i => (
            <PostCard key={i.id} data={i} />
          ))}
          <div className="w-full animate-pulse text-center text-sm text-gray-600">
            <span id="scroll-end" ref={ref} className="mt-5">
              {isEnd ? 'You Viewed all the posts' : 'Loading'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

const TopBar = () => {
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent) {
    let t = toast.loading('Please Wait')

    const data: Partial<z.infer<typeof postSchema>> = {
      url: (document.getElementById('image-url') as HTMLInputElement).value,
    }

    const res = await fetch('/api/posts/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then(res => res.json())

    if (res.code == 200) {
      router.refresh()
    } else {
      toast.error('Something went wrong')
    }
  }
  return (
    <>
      <div className="sticky top-16 z-30 flex h-20 w-full items-center justify-end bg-white">
        <Dialog>
          <DialogTrigger>
            <Button size={'sm'} className="bg-blue-500 hover:bg-blue-600">
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="remove-radix-close-icon">
            <DialogHeader>
              {/* form area */}
              <form onSubmit={handleSubmit}>
                <div className="flex h-auto w-full flex-col">
                  <Label htmlFor="image-url" className="mb-2">
                    Image URL
                  </Label>
                  <Input required placeholder="Eg: https://images.com/sunset-landscape.png" id="image-url" name="imageUrl" />

                  <div className="mt-5 flex space-x-2">
                    <Button variant={'outline'} type="submit">
                      Post
                    </Button>

                    <DialogClose asChild>
                      <Button variant={'ghost'} type="button">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

const PostCard = ({ data }: { data: z.infer<typeof postSchema> }) => {
  const [isliked, setIsLiked] = useState<boolean>()
  const { data: session } = useSession()
  const DAY_MILLISECONDS = 1000 * 60 * 60 * 24

  async function handleRemoveLike() {
    const res = await fetch('/api/posts/remove-like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pId: data.id, likedBy: session?.user.id }),
    }).then(res => res.json())

    if (res.code == 200) {
      setIsLiked(false)
    }

    data.likecount--
  }

  async function handleLikeButtonClick() {
    if (isliked) {
      handleRemoveLike()
      return
    }
    const res = await fetch('/api/posts/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pId: data.id, likedBy: session?.user.id }),
    }).then(res => res.json())

    if (res.code == 200) {
      setIsLiked(true)
    }

    data.likecount++
  }
  function getRelativeTime(timestamp: any) {
    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    })
    const daysDifference = Math.round((timestamp - new Date().getTime()) / DAY_MILLISECONDS)

    return rtf.format(daysDifference, 'day')
  }
  useEffect(() => {
    if (data.LikeRef.length > 0) {
      setIsLiked(true)
    }
  }, [])
  return (
    <>
      <Card className="mb-1 flex h-auto w-full flex-col rounded-none border-[1px]  border-b-0 shadow-none">
        {/* header */}
        <div className="flex h-12 items-center justify-start border-0 border-b-[1px] px-2">
          {/* <div className="flex h-8 w-8 items-center justify-start">
            <FirstLetterLogo />
          </div> */}
          <div className="flex h-8 w-fit flex-col ">
            <span className="text-sm font-medium">{data.user.name}</span>
            <span className="-mt-1 text-xs font-light">{data.user.handle}</span>
          </div>
        </div>
        {/* image holder */}
        <div className="relative flex h-96 items-center justify-start border-0 border-b-[1px]">
          <Image src={data.url} alt="posted image" fill={true} className="h-full w-full object-cover" />
        </div>
        {/* bottom bar */}
        <div className="flex h-12 items-center justify-between border-0 border-b-[1px] px-1">
          <div onClick={handleLikeButtonClick} className="flex h-10 w-1/3 items-center justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cn('mx-2 my-2 h-6 w-6 fill-none stroke-slate-900', isliked ? 'fill-pink-500 stroke-pink-500' : 'fill-none stroke-slate-900')}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="text-sm">{data.likecount} likes</span>
          </div>
          <div className="flex h-10 w-1/3 items-center justify-center">
            <span className="text-sm">{data.user.handle}</span>
          </div>
          <div className="flex h-10 w-1/3 items-center justify-end">
            <span className="mx-2 text-sm">{getRelativeTime(new Date(data.date).getTime())}</span>
          </div>
        </div>
      </Card>
    </>
  )
}

export default PostsPage
