import remoteSource, {ArticleFrontMatter} from "../contentloader";

export default {
  async load():Promise<ArticleFrontMatter[]> {
    const recentContent = Array.from(await remoteSource)
    const contents = recentContent.sort((a,b)=> {
      let ad = a.frontmatter.date.getTime()
      let bd = b.frontmatter.date.getTime()
      return bd-ad
    })
    const recent = contents.slice(0,3)

    return recent.map(item => item.frontmatter)
  }
}