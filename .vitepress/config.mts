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
      { icon: 'github', link: 'https://github.com/ktKongTong/btnews' },
      {
        icon: {
          svg: '<?xml version="1.0" ?><svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs19"/><g id="g3021"/><g id="Layer_1_1_"/><g id="Layer_1_1_-7" transform="translate(-819.672,-61.929991)"/><g id="g2989"><rect height="512" id="rect2989" rx="70" ry="70" style="fill:#ea7819;fill-opacity:1;stroke:none" transform="scale(-1,-1)" width="512" x="-512" y="-512"/><path d="m 81.05643,267.04958 c 43.7041,0 84.78879,17.07214 115.66407,48.12395 30.93179,31.05179 47.96156,72.41184 47.96156,116.44072 h 67.34951 c 0,-127.8857 -103.61898,-231.92124 -230.97514,-231.92124 v 67.35657 z M 81.1624,147.65054 c 155.7603,0 282.48808,127.4197 282.48808,284.04844 H 431 C 431,237.92528 274.05354,80.30102 81.1624,80.30102 v 67.34952 z m 93.13421,236.99769 c 0,25.75647 -20.89183,46.6483 -46.6483,46.6483 C 101.89184,431.29653 81,410.41176 81,384.64823 c 0,-25.7706 20.88477,-46.64831 46.64124,-46.64831 25.75649,0 46.65537,20.87771 46.65537,46.64831 z" id="path3844" style="fill:#ffffff"/></g></svg>'
        },
        link: 'https://btnews.ktlab.io/feed.rss' },
    ],
  }
})
