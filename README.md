<h1 align="center">⭐ NextJS Habit Loop APP ⭐</h1>
<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/ui.shadcn-in_use-orange?style=flat&logo=shieldsdotio" alt="ui.shadcn"/></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-v14.2-blue?style=flat&logo=next.js" alt="nextjs"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-in_use-06B6D4?style=flat&logo=tailwindcss" alt="tailwindcss"/></a>
</p>

## 🧑‍💻 Developing

First, if you want to start the app local,run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

if we want to start the app in **development mode** with docker, we just need to run:

```bash
docker-compose up -d dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Also, if you want to run the **production mode**, you can run:

```bash
docker-compose up -d prod
```

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## ⚙️ Building

```bash
npm run build
```

## ✅ Testing

run all of them you can run:

```bash
npm run test
```

To run the linter you can execute:

```bash
npm run lint
```
