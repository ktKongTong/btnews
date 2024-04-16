import remoteSource from "../../contentloader";
import {archives} from "./index";
import * as _ from 'radash';

export default {
    async paths() {
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

        const catalogs = archives.flatMap(ns=> {
          // 一个ns一个？一个 category 一个
          const categories = ns.categories.map(category=>
            ({
              ns: ns.id,
              id: category.id,
              topics: category.topics.map(topic=>
                ({
                  topic:topic.name,
                  articles: topic.ids.map(id=> ({id,category:category.id,topic: topic.name, ns:ns.id}))
                })
              )
            })
          )
          return categories.flatMap(category=> {
            return category.topics.map((topic)=> {
              let content = `# ${topic.topic}\n\n`
              content = content + topic.articles
                .filter(article=>  contentMap[`${article.ns}_${article.category}_${article.id}`])
                .map(article=> {
                const entry = contentMap[`${article.ns}_${article.category}_${article.id}`]![0]
                return `### [${entry.frontmatter.title}](/archive/${entry.id})`
              }).join('\n\n')
              return {
                params: {
                  id: topic.topic,
                  title: topic.topic,
                  date: new Date(),
                  catalog: true
                },
                content: content
              }
            })
          })
        })




        const articles =  items.filter(item=>contentMap[`${item.ns}_${item.category}_${item.id}`] && contentMap[`${item.ns}_${item.category}_${item.id}`]!.length > 0)
          .map(item=> {
              const entry = contentMap[`${item.ns}_${item.category}_${item.id}`]![0]
              let params = {
                ...entry.frontmatter,
                  id: entry?.id??entry.key,
                  archive: item.topic,
                  tags: entry.frontmatter?.tags??[],
                  bvid: entry.frontmatter?.bvid??undefined,
                  ytid: entry.frontmatter?.ytid??undefined,
                  description: entry.frontmatter?.description??'',
                  date: entry.frontmatter?.date??'',
                  title: entry.frontmatter?.title??'',
              }
              return {
                  params: params,
                  frontmatter: entry.frontmatter,
                  content: entry.content
              }
          })
      let res = ([] as any[]).concat(articles).concat(catalogs)
        return res
    }
}