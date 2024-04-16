import {remoteSource} from "./remote";
import {getReadingTime, ReadingTime} from "./.vitepress/readTime";
import fsDriver from "unstorage/drivers/fs";
import githubDriver from "unstorage/drivers/github";
export interface ArticleFrontMatter {
  id: string,
  index?: string,
  title: string,
  date: Date,
  namespace: string,
  category: string,
  tags: string[],
  bvid?: string,
  ytid?: string,
  xgid?: string,
  wbid?: string,
  readingTime: ReadingTime,
  catalog: boolean,
  description: string,
  [key: string]: any,
}

export interface Content {
  key: string,
  // namespace_item_idx
  id: string,
  index?: string,
  frontmatter: ArticleFrontMatter,
  content: string,
  [key: string]: any
}

// import '.vitepress/theme/index.ts'

  let imagePattern = /(!\[.*]\()(\/images\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/[0-9]{4}_[0-9]{4}\/[0-9]{4}(_5)?\/.+\.webp.*\))/g


const createDriver = ()=> {
  if(process.env.NODE_ENV === "development" || process.env.DRIVER === "local") {
    let base = process.env.DOCS_PATH ?? "./docs/docs"
    return fsDriver({ base: base,ignore:["**/node_modules/**","**/.git/**","**/images/**",]})
  }
  console.log('use github driver')
  return githubDriver({
    repo: "ktKongTong/btnews",
    branch: "master",
    dir: "/docs",
    token: process.env.GITHUB_TOKEN,
  })
}


const driver = createDriver()
// transformedSource
const source:Promise<Content[]> = (async ()=> {
  console.log('start load remote content')
  const rs = await remoteSource(driver)
  console.log('remote content loaded')
  let res=  rs.map(it=> {
    let fn = it.key.split(':').at(-1)
    const readingTime = getReadingTime(it.content)
    // pr
    let content = it.content.replaceAll(imagePattern, '$1https://cdn.jsdelivr.net/gh/ktKongTong/btnews@master$2')
    let itemId = fn!.replace('.md','')
    let index = itemId.split('_').at(-1)
    let ns = it.key.split(':').at(0) ?? 'other'
    let tags = it.frontmatter.tags??[] as string[]
    let category = fn!.split('_')[0]
    category = it.frontmatter.category??category

    return {
      key: it.key,
      id: `${ns}_${itemId}`,
      index,
      title: it.title,
      frontmatter: {
        catalog: false,
        namespace: ns,
        id: `${ns}_${itemId}`,
        index,
        date: it.frontmatter.date ?? new Date(),
        description: it.frontmatter.description ?? "",
        ...it.frontmatter,
        title: it.title,
        tags: tags,
        category,
        readingTime,
      },
      content,
    }
  })
  return res
})()



export default source