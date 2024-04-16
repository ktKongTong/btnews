// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import ArticleLayout from "../layout/ArticleLayout.vue";
import {baseURL} from "../../shared";
export default {
  extends: DefaultTheme,
  Layout: ArticleLayout,
  async enhanceApp({ app, router, siteData }) {
    // load
    router.onBeforeRouteChange = async (to) => {
      console.log("match",to)
      let pt = /\/btnews\/idx\/([0-9]{4}(_5)?)\/?$/
      let datePT = /\/btnews(\/20[0-9]{2}\/[0-9]{1,2}\/[0-9]{1,2})\/?$/
      if(to.match(pt)) {
        let res = pt.exec(to)
        let idx = res[1]
        router.go(`/btnews_btnews_${idx}`)
      }else if(to.match(datePT)) {
        console.log("match",to)
        console.log('load dateMap')

        const datemap = await fetch(`${baseURL}/datemap.json`).then(res=>res.json()) as Record<string, string>
        console.log('dateMap load')

        let res = datePT.exec(to)
        let date = res[1]
        let id = datemap[date]
        if(id){
          router.go(id)
        }
      }
    }
  }
} satisfies Theme
