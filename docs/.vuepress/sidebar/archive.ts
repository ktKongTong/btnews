import {contentMap} from "../scanfile";
import {categoryArchiveList} from "../categoryArchiveList";
import {getIdFromFilename} from "../utils";


const generatePageSidebarFromId = (archiveItem:string,category,archive) => {
    let item = contentMap.get(archiveItem)
    let id = getIdFromFilename(archiveItem)
    id = id.replace(/_/g,".")
    return {
        text: item.frontmatter.title,
        link: `/${category.category}/archive/${archive.name}/${id}/`,
    }
}

const generateArchiveSideBar = (archive,category) => {
    return {
        text: archive.name,
        collapsible: true,
        children: archive.content
            .filter(archiveItem => contentMap.has(archiveItem))
            .map(archiveItem => generatePageSidebarFromId(archiveItem,category,archive))
    }
}

export const archiveSideBar = () =>{
    return categoryArchiveList.map(category => {
        return {
            text: category.category,
            children: category.archiveList
                .map(archive =>generateArchiveSideBar(archive,category))
                .filter(item => item?.children.length > 0)
        }
    }).filter(item => item?.children.length > 0)
}