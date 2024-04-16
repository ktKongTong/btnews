import {archives} from "./index.ts";
import * as _ from "radash";
import remoteSource from "../../contentloader.ts";

type categoryArchive = {
  category: string
  archiveList: Archive[]
}
type Archive = {
  name : string
  content: string[]
}

// 自定义合集
export const archiveNavbar = async () => {
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

  return archives.flatMap(ns=>
      ns.categories.map(category=>({
        text: category.name,
        items: category.topics.map(topic=> ({
          text: topic.name,
          link: `/archive/${topic.name}`
        }))
      }))
  )
  .filter(item=> item.items.length > 0)
}