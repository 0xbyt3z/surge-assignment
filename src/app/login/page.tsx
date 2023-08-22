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
import ReCAPTCHA from 'react-google-recaptcha'
import { useEffect, useRef, useState } from 'react'

const formSchema = z.object({
  handle: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, { message: 'Password should contain atleast 8 characters.' }),
})

export default function LoginPAge() {
  const [state, setState] = useState<{ value: any; callback: any; load: boolean; expired: any }>({ value: '', callback: 'not fired', expired: 'false', load: false })
  const router = useRouter()
  const _reCaptchaRef = useRef()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const t = toast.loading('Please Wait')
    if (process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA == 'true') {
      if (state.value == '') {
        toast.error('Please check the reCaptcha', { id: t, position: 'top-center' })
        return
      }
    }
    //key can be either the email or the handle of the user
    signIn('credentials', { redirect: false, key: values.handle, password: values.password })
      .catch(error => console.log(error))
      .then(res => {
        if (res?.status == 401) {
          toast.error('Invalid Credentials', { id: t })
        } else {
          //use location.replace() instead
          //router.replace() does not refresh page content
          location.replace('/posts')
          toast.success('Logged in', { id: t })
        }
      })
  }

  function handleCaptchaChange(value: any) {
    console.log('Captcha value:', value)
    setState({ ...state, value })
    // if value is null recaptcha expired

    if (value === null) setState({ ...state, expired: 'true' })
  }

  function asyncScriptOnLoad() {
    setState({ ...state, callback: 'called!' })
    console.log('scriptLoad - reCaptcha Ref-', _reCaptchaRef)
  }
  useEffect(() => {
    setTimeout(() => {
      setState({ ...state, load: true })
    }, 1500)
    console.log('didMount - reCaptcha Ref-', _reCaptchaRef)

    console.log({ captcha: process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA })
  }, [])
  return (
    <div className="flex">
      <div className="fixed right-0 top-16 z-0 h-screen w-screen bg-gradient-to-t from-cyan-400 via-white   to-white"></div>
      <div className="z-40 flex h-[50vh] w-full flex-col items-center justify-center">
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
              {process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA == 'true' && state.load && (
                <div className="w-full">
                  <ReCAPTCHA theme="dark" ref={_reCaptchaRef} sitekey={'6Le2H7YnAAAAADT2wHAfyWsbUIYS6_gdG8d47IRu'} onChange={handleCaptchaChange} asyncScriptOnLoad={asyncScriptOnLoad} />
                </div>
              )}
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
    </div>
  )
}
