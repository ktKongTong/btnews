import {archiveSidebar} from "./sidebar";
import {archiveNavbar} from "./navbar";
import * as fs from 'fs';
import pkg from 'js-yaml';
import path from "path";
const { load } = pkg;

type ArchiveNamespace = {
  namespaces: Archive[]
}

type Archive = {
  name: string,
  id: string,
  categories: categoryArchive[]
}
type categoryArchive = {
  name: string,
  id: string,
  topics: TopicItem[]
}
type TopicItem = {
  name : string
  ids: string[]
}
const fileContents = fs.readFileSync(path.join(__dirname,'./archive.yaml') , 'utf8');
export const archives:Archive[] = (load(fileContents) as ArchiveNamespace).namespaces;


const archive= {
  sidebar: archiveSidebar(),
  navbar: archiveNavbar(),
}

export default archive