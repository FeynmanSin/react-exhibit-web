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
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      // target: 'http://192.168.1.108:8081/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  },
  mock: false,
  npmClient: 'pnpm',
  hash: true,
  extraPostCSSPlugins: [require("tailwindcss")({ config: "tailwind.config.js" })],
});
