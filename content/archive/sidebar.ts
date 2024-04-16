import remoteSource from "../../contentloader";
import * as _ from "radash";
import {archives} from "./index.ts";
export async function archiveSidebar() {
  const contents = Array.from(await remoteSource)

  const items = archives.flatMap((ns)=> {
    return ns.categories.flatMap(category=> {
      return category
        .topics.flatMap(topic=>
          topic.ids.map(id=>
            ({id,category:category.id,topic: topic.name, ns:ns.id})
          )
        )
    })
  })
  const filtered = contents
    .filter(
      content=> items.filter(item=>
        item.ns === content.frontmatter.namespace
        && item.category === content.frontmatter.category
        && item.id === content.frontmatter.index
      ).length > 0
    )
  const contentMap = _.group(filtered,
    item=>`${item.frontmatter.namespace}_${item.frontmatter.category}_${item.frontmatter.index}` as string
  )
  let res = archives.map(ns=> ({
    text: ns.name,
    collapsed: false,
    items: ns.categories.map(category=>({
      text: category.name,
      collapsed: false,
      items: category.topics.map(topic=> ({
        text: topic.name,
        link: `/archive/${topic.name}`,
        collapsed: true,
        items: topic.ids.map(id=> ({
          text: contentMap[`${ns.id}_${category.id}_${id}`]?.[0].frontmatter.title ??"",
          link:`/archive/${ns.id}_${category.id}_${id}`,
        }))
      })).filter(item=> item.items.length > 0)
    })).filter(item=> item.items.length > 0)
  }))
  return  res
}