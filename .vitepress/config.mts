import { defineConfig } from 'vitepress'
import {RssBuildEndHook} from "./rss";
import {getSidebar} from "../content/sidebar";
import archive from "../content/archive";
export default defineConfig({
  title: "睡前消息文稿合集",
  head: [['link', { rel: 'icon', href: '/images/index.png' }]],
  description: "A VitePress Site",
  cleanUrls:true,
  srcDir:'content',
  ignoreDeadLinks: true,
  buildEnd:RssBuildEndHook({
    hostname: 'https://vp-btnews.ktlab.io',
    language: 'zh',
    copyright: ""
  }),
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav:  [
      {
        text: "索引",
        link: "/idx",
        icon: "lightbulb",
      },
      {
        text: "合集",
        items: await archive.navbar,
      },
    ],
    sidebar:{
      '/':await getSidebar(),
      '/archive/': await archive.sidebar,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ktKongTong/btnews' }
    ]
  }
})
