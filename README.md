# Assignment - Surge Software Engineering Intern

## info
- Link : [surgeintern.vercel.app](https://surgeintern.vercel.app)
- Application Type : Web Application
- Time spent building : 4 days

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
- [x] Post Indexing depends on the time created and the no. of likes recieved
- [x] End to End Test cases and Deploy using Github actions.
- [x] Dockerize the entire application. (node,mysql)

## challanges
I faced to challanges during development process. They are,
- **Writing Tests** - Eventhough i had experience developing web applications this is the first time i spend writing test for a application with a auth provider. And i spend somewhere around 4 hours to figure out a workaround. Test can be run only in the developement disableing the recaptcha from the .env. Login page provides the JWT session and without the users cannot access the prtected pages.

- **CI/CD pipelines** - I am used to  deploy application on hosting services such as Vercel and Netlify using automatic deployment which does not require to write manual scripts. But i manage to work with Github Actions gaining a sound understanding.

## my own implementations
- Infinite Scroll - Cursor based scroll fetch requests posts on demand.
- Relative Time -  Relative time for posts based on Internationalization API.

## software used
- VS Code - Code editor
- Postman - API testing
- Terminator - Terminal
- Docker - Virtualization Software
- Firefox/Chrome - Web browsers

## proofs
### Github Actions
![image](https://github.com/0xbyt3z/surge-assignment/assets/40062006/658fc06e-fbc2-45e7-be02-e4359b46d971)

![image](https://github.com/0xbyt3z/surge-assignment/assets/40062006/c7bf54f3-7047-4fac-a9e6-8b890e14a57d)

### Tests
![Screenshot at 2023-08-22 15-22-16](https://github.com/0xbyt3z/surge-assignment/assets/40062006/cd8aa9ed-9570-4505-aa7b-e3c15dadaa6a)

![Screenshot at 2023-08-22 15-27-25](https://github.com/0xbyt3z/surge-assignment/assets/40062006/ea4834bd-cf75-4f52-866c-5da92617d192)
