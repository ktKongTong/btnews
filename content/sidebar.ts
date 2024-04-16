import * as _ from "radash";
import source from "../contentloader";
import {getCategoryName, getNSName} from "../meta";

const keyToRange = (item:string)=> {
  let rangePattern = /[0-9]{4}_[0-9]{4}/
  let res = rangePattern.exec(item)
  let range = res?.[0]
  if(range) {
    let r = range.split('_')
    let start = parseInt(r[0])
    let end = parseInt(r[1])
    return `第 ${start} ~ ${end} 期`
  }
  return "unknown"
}


export async function getSidebar() {
  const contents = Array.from(await source)
  const groupedContents = _.group(contents, item=>item.frontmatter.namespace)
  const sidebars = _.mapValues(groupedContents, (v,k)=> {
    if(!v) {
      return
    }
    const groupedByCategoryContents = _.group(v, item=>item.frontmatter.category)
    const entries = _.mapValues(groupedByCategoryContents, (categoryContent,category)=> {
      if(!categoryContent) {
        return
      }
      const indexRanged = _.group(categoryContent, item => keyToRange(item.key))
      // may no indexed
      // indexRanged
      if(indexRanged["unknown"]) {
        return {
          text: getCategoryName(category),
          collapsed: true,
          items: indexRanged["unknown"]!.map(it=> ({text:it.title, link: `/${it.id}`}))
        }
      }


      const entries = _.mapValues(indexRanged, (v,k)=> {
        return {
          text: k,
          collapsed: true,
          items: v
            ?.map(
              item=> ({
                text:item.title,
                link: `/${item.id}`,
              })
            )
        }
      })
      return {
        text: getCategoryName(category),
        collapsed: false,
        items:Object.values(entries).sort((a,b)=>a.text.localeCompare(b.text))
      }
    })

    return {
      text: getNSName(k),
      collapsed: false,
      items:Object.values(entries)
    }
  })
  return Object.values(sidebars)
}
