import { defineConfig } from 'vitepress'
import {RssBuildEndHook} from "./rss";
import {getSidebar} from "../content/sidebar";
import archive from "../content/archive";
export default defineConfig({
  title: "睡前消息文稿合集",
  lang:'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/images/index.png' }],
    ['meta', { property: 'og:image', content: '/images/index.png' }],
    ['meta', { property: 'twitter:image', content: '/images/index.png' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-PWJM1MC3FG' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-PWJM1MC3FG');`
    ],
    [
      'script',

      {
        defer: '',
        src: 'https://us.umami.is/script.js',
        "data-website-id": "2a4e66d7-6f74-4f5f-891f-4de6c6534080"
      }
    ],

  ],
  description: "睡前消息文稿合集",
  cleanUrls:true,
  srcDir:'content',
  ignoreDeadLinks: true,
  buildEnd:RssBuildEndHook({
    hostname: 'https://btnews.ktlab.io',
    language: 'zh',
    copyright: ""
  }),
  themeConfig: {
    logo:'/images/index.png',
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
      {
        text: "友情链接",
        items: [{
          text:'《睡前消息》在线文稿',
          link: 'https://archive.bedtime.news',
        },{
          text:'《睡前消息》在线文稿仓库',
          link: 'https://github.com/bedtimenews/bedtimenews-archive-contents',
        }],
      },
    ],
    sidebar:{
      '/':await getSidebar(),
      '/archive/': await archive.sidebar,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ktKongTong/btnews' }
    ],
  }
})
