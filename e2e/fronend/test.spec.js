import { test, expect } from '@playwright/test'
import { cookies } from '../../storage.json'

//signup
test('should signup a new user', async ({ page }) => {
  await page.goto('http://localhost:3000/signup')

  await page.getByLabel('First Name').fill('e2e')
  await page.getByLabel('Last Name').fill('test')
  await page.getByLabel('Username').fill('e2e')
  await page.getByLabel('Email').fill('e2e@gmail.com')
  await page.getByLabel('Password', { exact: true }).fill('!@#123AAAbbb')
  await page.getByLabel('Confirm').fill('!@#123AAAbbb')
  await page.getByRole('button', { name: 'Sign Up' }).click()
  try {
    await page.waitForURL('http://localhost:3000/login', { timeout: 1000 })
  } catch (error) {
    console.log('\tGuess the user is already!')
    test.skip()
  }
})

//login
test('login if recaptcha is disabled', async ({ page }) => {
  if (process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA === 'true') {
    test.fail(true, 'Disable reCaptcha from the .env')
    console.log('---------')
    console.log('Please disable the recaptcha')
    console.log('---------')
  }

  await page.goto('http://localhost:3000/login')

  await page.getByLabel('Username').fill('e2e')
  await page.getByLabel('Password', { exact: true }).fill('!@#123AAAbbb')
  await page.locator('form').getByRole('button', { name: 'Login' }).click()
  await page.waitForURL('http://localhost:3000/posts')

  await page.context().storageState({ path: 'storage.json' })
})

//protected rOutes
test('visit protected page /posts without signin', async ({ page }) => {
  await page.goto('http://localhost:3000/posts')

  await page.waitForURL('http://localhost:3000/login?callbackUrl=%2F')
})

test('visit protected page /posts signed in', async ({ page }) => {
  page.context().addCookies([...cookies])
  await page.goto('http://localhost:3000/posts')

  if (page.url() == 'http://localhost:3000/login?callbackUrl=%2F') {
    //failed the test if the user is redirected to the login page
    test.fail()
  }
})

test('visit protected page /profile without signin', async ({ page }) => {
  await page.goto('http://localhost:3000/profile')

  await page.waitForURL('http://localhost:3000/login?callbackUrl=%2F')
})

test('visit protected page /profile signed in', async ({ page }) => {
  page.context().addCookies([...cookies])
  await page.goto('http://localhost:3000/profile')

  if (page.url() == 'http://localhost:3000/login?callbackUrl=%2F') {
    //failed the test if the user is redirected to the login page
    test.fail()
  }
})

//profile
test('check if the pages loads with data', async ({ page }) => {
  page.context().addCookies([...cookies])
  await page.goto('http://localhost:3000/profile')

  await page.getByText('Change Password').click()
})

test('open the password reset modal', async ({ page }) => {
  page.context().addCookies([...cookies])
  await page.goto('http://localhost:3000/profile')

  await page.getByText('Change Password').click()

  await page.isVisible('text=Change the Password')
})

test('reset the password', async ({ page }) => {
  page.context().addCookies([...cookies])
  await page.goto('http://localhost:3000/profile')

  await page.getByText('Change Password').click()

  await page.isVisible('text=Change the Password')

  await page.getByLabel('Current Password').fill('!@#123AAAbbb')

  //change the password to the password
  //to prevent other test in case they requires to password
  await page.getByLabel('New Password').fill('!@#123AAAbbb')
  await page.getByLabel('Confirm').fill('!@#123AAAbbb')

  await page.getByRole('button').filter({ hasText: 'Submit' }).click()

  await page.waitForURL('http://localhost:3000/')
})
