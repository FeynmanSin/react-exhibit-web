import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/layouts/BaseLayout" },
  ],
  npmClient: 'pnpm',
  hash: true,
  extraPostCSSPlugins: [require("tailwindcss")({ config: "tailwind.config.js" })],
});
