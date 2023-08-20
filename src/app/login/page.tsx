'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  handle: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, { message: 'Password should contain atleast 8 characters.' }),
})

export default function LoginPAge() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const t = toast.loading('Please Wait')
    //key can be either the email or the handle of the user
    signIn('credentials', { redirect: true, callbackUrl: '/', key: values.handle, password: values.password }).catch(error => console.log(error))
  }

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center">
      <div className="flex w-64 flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <span className="mt-5 w-full text-left text-xs text-gray-500">
          Do not have an account?.
          <Link href={'/signup'} className="hover:text-blue-500">
            Create one.
          </Link>
        </span>
      </div>
    </div>
  )
}
