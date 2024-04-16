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
    router.onBeforePageLoad = async (to) => {
      if(to == "/btnews" || to == "/btnews/idx") {
        router.go('/idx')
      }
      console.log("route",to)
      let idxPattern = /\/btnews\/idx\/([0-9]{4}(_5)?)\/?$/
      let datePattern = /\/btnews(\/20[0-9]{2}\/[0-9]{1,2}\/[0-9]{1,2})\/?$/
      let archivePattern = /\/btnews\/archive\/.+\/([0-9]{4}(_5)?)\/?$/
      let archiveIdxPattern = /\/btnews(\/archive\/.+)\/?$/
      if(to.match(idxPattern)) {
        let res = idxPattern.exec(to)
        let idx = res?.[1]
        if(idx){
          router.go(`/btnews_btnews_${idx}`)
          console.log(`go to/btnews_btnews_${idx}`)
        }
      }else if(to.match(datePattern)) {
        const datemap = await fetch(`${baseURL}/datemap.json`).then(res=>res.json()) as Record<string, string>
        let res = datePattern.exec(to)
        let date = res?.[1]
        if(date){
          let id = datemap[date]
          console.log(`go to ${id}`)
          router.go(id)
        }
      }else if(to.match(archivePattern)) {
        let res = archivePattern.exec(to)
        let idx = res?.[1]
        if(idx) {
          router.go(`/archive/btnews_btnews_${idx}`)
          console.log(`go to/archive/btnews_btnews_${idx}`)
        }
      }else if (to.match(archiveIdxPattern)) {
        let res = archiveIdxPattern.exec(to)
        let route = res?.[1]
        if(route) {
          router.go(route)
          console.log(route)
        }
      }
    }
  }
} satisfies Theme
