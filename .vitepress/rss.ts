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
  // You might need to adjust this if your Markdown files
  // are located in a subfolder

  const posts = await source
  posts.sort(
    (a, b) =>
      +b.frontmatter.date -
      +a.frontmatter.date
  )

  for (const { id, frontmatter, content } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: id,
      link: `${rssConfig.hostname}/${id}`,
      description: frontmatter.description ?? "",
      content: md.render(content),
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}