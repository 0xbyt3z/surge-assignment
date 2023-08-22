'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Label } from '@/components/ui/label'
import { DialogClose } from '@radix-ui/react-dialog'

const formSchema = z
  .object({
    current: z.string().min(8, { message: 'Password should contain atleast 8 characters.' }),
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'Password should contain atleast uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'Password should contain atleast lowercase character')
      .regex(new RegExp('.*\\d.*'), 'Password should contain atleast number')
      .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'Password should contain atleast special character')
      .min(8, 'Must be at least 8 characters in length'),
    confirm: z.string().min(8, { message: 'Password should contain atleast 8 characters.' }),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

function ProfilePage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<any>()

  async function fetchUser() {
    const res = await fetch('/api/user/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: session?.user.id }),
    }).then(res => res.json())

    if (res.code == 200) {
      setData(res.query)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let t = toast.loading('Please wait')

    const res = await fetch('/api/user/change-pass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values }),
    }).then(res => res.json())

    if (res.code == 200) {
      toast.success('Change the password successfully', { id: t })
      signOut({ redirect: true, callbackUrl: '/login' })
    } else {
      toast.error('Something went wrong when trying to change the password', { id: t })
    }
  }

  async function handleSubmit() {
    let url = (document.getElementById('image-url') as HTMLInputElement).value

    let t = toast.loading('Please wait')

    const res = await fetch('/api/user/change-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: url, id: data.id }),
    }).then(res => res.json())

    if (res.code == 200) {
      toast.success('Succesfull', { id: t })
    } else {
      toast.error('Something went wrong', { id: t })
    }
  }

  useEffect(() => {
    if (status == 'authenticated') {
      fetchUser()
    }
  }, [session])

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      <div className="z-10 h-full w-full">
        <h1 className="text-3xl font-semibold tracking-tighter">Profile</h1>
        <p className="w-2/3 text-sm">Curabitur placerat tortor nec tortor malesuada pharetra. Nulla ut volutpat purus. Proin maximus ornare nunc, a mattis arcu varius sed.</p>

        {/* details section */}
        {data && (
          <div className="flex h-auto w-full flex-col pt-10">
            <Dialog>
              <DialogTrigger>
                <div className="mb-10 h-16 w-16 rounded-full bg-gray-300 hover:bg-gray-400">
                  <img src={session?.user.image?.toString()} alt="" />
                </div>
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
                          Change
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
            <div className="mb-5 flex flex-col">
              <span className="text-xs">Full Name</span>
              <span className="text-xl">{data.name}</span>
            </div>
            <div className="mb-5 flex flex-col">
              <span className="text-xs">Username</span>
              <span className="text-xl">{data.handle}</span>
            </div>
            <div className="mb-5 flex flex-col">
              <span className="text-xs">Email</span>
              <span className="text-xl">{data.email}</span>
            </div>
            <div className="mb-5 flex flex-col">
              <span className="mb-2 text-xs">Password</span>

              <Dialog>
                <DialogTrigger className="w-fit">
                  <Button variant={'outline'} size={'sm'} className="w-fit">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex w-10/12 flex-col items-start text-left lg:w-full">
                  <DialogHeader className="text-left">
                    <DialogTitle>Change the Password</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start space-y-2">
                        <FormField
                          control={form.control}
                          name="current"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="************" {...field} className="w-56" />
                              </FormControl>
                              <FormDescription>This is your current password.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="************" {...field} className="w-56" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm </FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="************" {...field} className="w-56" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit</Button>
                      </form>
                    </Form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage
