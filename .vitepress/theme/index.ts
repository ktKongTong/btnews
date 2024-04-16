// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import ArticleLayout from "../layout/ArticleLayout.vue";

export default {
  extends: DefaultTheme,
  Layout: ArticleLayout,
  enhanceApp({ app, router, siteData }) {

    // ...
  }
} satisfies Theme
