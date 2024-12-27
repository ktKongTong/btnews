import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import {createContentLoader, createMarkdownRenderer, type SiteConfig} from 'vitepress'
import source from "../contentloader";

interface RssConfig {
  hostname: string
  language: string
  image: string
  copyright: string
}

const formatDate = (date: Date) => {
  // return 2021/01/12
  return `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
export const RssBuildEndHook = (rssConfig:RssConfig) => async (config: SiteConfig) => {

  let md = await createMarkdownRenderer("")

  const feed = new Feed({
    title: config.site.title,
    description: config.site.description,
    id: rssConfig.hostname,
    link: rssConfig.hostname,
    language: rssConfig.language,
    image: rssConfig.image,
    favicon: `${rssConfig.hostname}/images/index.png`,
    copyright:rssConfig.copyright
  })
  const posts = await source
  posts.sort(
    (a, b) =>
      +b.frontmatter.date -
      +a.frontmatter.date
  )
  let dateMap = {} as Record<string, string>;

  for (const { id, frontmatter, content } of posts) {
    let date = formatDate(frontmatter.date)
    if(!dateMap[date] && frontmatter.category == 'btnews'){
      dateMap[date] = `/${id}`
    }
    feed.addItem({
      title: frontmatter.title,
      id: id,
      link: `${rssConfig.hostname}/${id}`,
      description: frontmatter.description ?? "",
      content: md.render(content),
      date: frontmatter.date
    })
  }
  writeFileSync(path.join(config.outDir, 'datemap.json'), JSON.stringify(dateMap))
  const content = feed.rss2()
  writeFileSync(path.join(config.outDir, 'feed.rss'), content)
}