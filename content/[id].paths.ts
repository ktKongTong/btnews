import remoteSource from "../contentloader";


export default {
    async paths() {
        const contents = Array.from(await remoteSource)

        // index

        let content = "# 索引\n"
        content += contents.map(it=> {
            return `### [${it.title}](/${it.id})`
        }).join('\n\n')
        const idx = {
            params: {
                id:"idx",
                catalog: true
            },
            content: content
        }


        let articles =  contents.map(entry => {
            let params = {
                ...entry.frontmatter,
                id: entry?.id??entry.key,
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
        return ([] as any[]).concat(articles).concat([idx])
    }
}