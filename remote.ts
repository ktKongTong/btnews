import {createStorage, Driver} from "unstorage";
import frontmatter from "gray-matter";
import 'dotenv/config'



interface RemoteSource {
    title: string,
    key: string,
    frontmatter: {
      [key: string]: any
    },
    content: string,
}

async function loadRemoteSource (driver:Driver):Promise<RemoteSource[]> {
  const storage = createStorage({ driver: driver });
  const ls = await storage.getKeys('')
  const it = ls.map(async (key)=> {
    const item = await storage.getItem(key)
    let content = item as string
    let fm = frontmatter(content)
    return {
      title: fm.data.title?? key.split(":").at(-1),
      key: key,
      frontmatter: fm.data,
      content: fm.content
    }
  })
  const res=  await Promise.all(it)
  return res
}

export const remoteSource = (driver:Driver) => loadRemoteSource(driver)