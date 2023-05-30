import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/",
      component: "@/layouts/BaseLayout",
      routes: [
        {
          path: '/',
          redirect: '/task'
        },
        {
          path: '/task',
          component: 'Task'
        },
        {
          path: '/resource',
          component: 'Resource'
        },
      ]
    },
  ],
  npmClient: 'pnpm',
  hash: true,
  extraPostCSSPlugins: [require("tailwindcss")({ config: "tailwind.config.js" })],
});
