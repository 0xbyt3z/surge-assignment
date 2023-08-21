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
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change the Password</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
