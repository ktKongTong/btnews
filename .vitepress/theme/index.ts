// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import ArticleLayout from "../layout/ArticleLayout.vue";
import * as _ from 'radash'
import {dateMap} from "../../shared";
export default {
  extends: DefaultTheme,
  Layout: ArticleLayout,
  async enhanceApp({ app, router, siteData }) {
    router.onBeforePageLoad =
    (to) => {
      // console.log('to',to)
      let pt = /\/btnews\/idx\/([0-9]{4}(_5)?)\/?$/
      let datePT = /\/btnews(\/20[0-9]{2}\/[0-9]{2}\/[0-9]{2})\/?$/
      if(to.match(pt)) {
        // console.log("match",to)
        let res = pt.exec(to)
        let idx = res[1]
        router.go(`/btnews_btnews_${idx}`)
      }else if(to.match(datePT)) {
        // console.log("match",to)
        let res = datePT.exec(to)
        let date = res[1]
        // console.log(dateMap)
        let id = dateMap.get(date)
        // console.log("match",date,id)
        if(id){
          router.go(`/${id}`)
        }
      }
    }
  }
} satisfies Theme
