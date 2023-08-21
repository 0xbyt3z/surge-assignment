'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const formSchema = z
  .object({
    //TODO : prevent users from adding special chars to the username
    handle: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    fname: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    lname: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email({ message: 'Please provide a valid email.' }),
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

export default function SignupPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const t = toast.loading('Please Wait')
    const res: Partial<{ code: number; msg: string; query: { handle: string } }> = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ ...values }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())

    if (res.code == 200) {
      toast.success('Successfully created the account', { id: t })
      router.push('/login')
    } else {
      toast.error('Error Occured while creating an account', { id: t })
    }
  }

  return (
    <div className="flex">
      <div className="fixed right-0 top-16 z-0 h-screen w-screen bg-gradient-to-t from-emerald-500 via-white   to-white"></div>
      <div className="z-40 flex h-[70vh] w-full flex-col items-center justify-center">
        <div className="flex w-72 flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-x-4">
                <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="text-gray">First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lname"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="text-gray">Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray">Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray">Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                    <FormLabel className="text-gray">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
          <span className="mt-5 w-full text-left text-xs text-gray-500">
            Already have an account?.
            <Link href={'/login'} className="hover:text-blue-500">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
