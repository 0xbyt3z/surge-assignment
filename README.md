# Assignment - Surge Software Engineering Intern

## info
- Link : [surgeintern.vercel.app](https://surgeintern.vercel.app)
- Application Type: Web Application
- Time spent building: 4 days

## stack
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) 
- Next Auth - Authorization Library
- Zod - Type validation Library

## requirements
- [x] Authentication
    - Register and Login screens for authentication.
    - Integration of Captcha for login/registration forms.
    - Users can authenticate with their username/email and password.
    - Use an identity management solution for authentication.
    - Validation for all sorts of data and input fields.
- [x] Protect pages - protected using middleware ["/posts","/profile"]
- [x] Post Indexing depends on the time created and the no. of likes received
- [x] End to End Test cases and Deploy using Github actions.
- [x] Dockerize the entire application. (node, MySQL)

## challenges
I faced challenges during the development process. They are,
- **Writing Tests** - Even though I had experience developing web applications this is the first time I spend writing tests for an application with a auth provider. And I spend somewhere around 4 hours to figure out a workaround. The test can be run only in the development disabling the recaptcha from the .env. The login page provides the JWT session and without users cannot access the protected pages.

- **CI/CD pipelines** - I am used to  deploying applications on hosting services such as Vercel and Netlify using automatic deployment which does not require writing manual scripts. But I manage to work with Github Actions gaining a sound understanding.

## features
- Infinite Scroll - Cursor-based scroll fetch requests posts on demand.
- Relative Time -  Relative time for posts based on Internationalization API.
- Like/Removing a Like - Response behavior based on promises.
- Posting - Users can post pictures using URLs to the images as the assignment does not encourage the usage of File Storages.

## software used
- VS Code - Code Editor
- Postman - API testing
- Terminator - Terminal
- Docker - Virtualization Software
- Firefox/Chrome - Web browsers

## Commands
- <code>yarn dev</code> - Starts development server (web)
- <code>yarn test</code> - Run tests
- <code>docker compose up --build</code> - Docker commands
- <code>yarn studio</code> - Spin up Prisma studio using .env.local and dev.prisma schema
- <code>yarn db:push</code> - Push model changes to the database using .env.local and dev.prisma
- <code>yarn prisma db seed</code> - Seed the database

## proofs
### Github Actions
![image](https://github.com/0xbyt3z/surge-assignment/assets/40062006/658fc06e-fbc2-45e7-be02-e4359b46d971)

![image](https://github.com/0xbyt3z/surge-assignment/assets/40062006/c7bf54f3-7047-4fac-a9e6-8b890e14a57d)

### Tests
![Screenshot at 2023-08-22 15-22-16](https://github.com/0xbyt3z/surge-assignment/assets/40062006/cd8aa9ed-9570-4505-aa7b-e3c15dadaa6a)

![Screenshot at 2023-08-22 15-27-25](https://github.com/0xbyt3z/surge-assignment/assets/40062006/ea4834bd-cf75-4f52-866c-5da92617d192)
