
import { Command } from 'commander';
import * as ghac from '@actions/core';
import fs from 'fs'
const regex =/【(睡前消息|高见|讲点黑话)(\d{2,4})期?】(.+)/
const categoryMap = {
  '睡前消息': 'btnews',
  '高见': 'opinion',
  '讲点黑话': 'commercial'
}

const isGitHubAction = process.env.GITHUB_ACTIONS


const program = new Command();
function getOptions() {
  program
    .option('--bv [string]')
    .option('--category [string]', 'category');
  const options = program.opts();
  program.parse(process.argv);
  const bv = options.bv!==""?(typeof options.bv == "boolean" ?undefined:options.bv):undefined;
  let category: "btnews" | "opinion" | "commercial" | undefined
  if(options.category !== "" && typeof options.category == "string") {
    category = options.category as "btnews" | "opinion" | "commercial"
  }else {
    category = undefined
  }
  return {
    bv,
    category
  }
}

export const options = getOptions()
console.log(options)

const categoryToBiliMap = {
  'btnews': {
    mid: '316568752',
    keywords: '睡前消息'
  },
  'opinion': {
    mid: '59104725',
    keywords: '高见'
  },
  'commercial': {
    mid: '64219557',
    keywords: '讲点黑话'
  }
} as const

const getDefaultCategory = () => {
  // 0, 2, 5
  // 1, 3, 4, 6
  const day = new Date().getDay()
  let category = 'btnews' as keyof typeof categoryToBiliMap
  if( day == 3 || day == 1) {
    category = 'opinion' as const
  }else if (day == 4 || day == 6) {
    category = 'commercial' as const
  }
  return category
}

async function getNewestVideoByCategory(category?: (keyof typeof categoryToBiliMap)) {


  let _category = category ?? getDefaultCategory()
  const res = await fetch(`https://api.bilibili.com/x/series/recArchivesByKeywords?mid=${categoryToBiliMap[_category].mid}&keywords=${categoryToBiliMap[_category].keywords}`)
  const data = await res.json()
  const video = data.data.archives[0]
  const bvid = video.bvid
  return bvid
}

function getPathAndIndexByTitle(title:string) {
  const [, type, index ] = regex.exec(title)!
  const category = categoryMap[type as keyof typeof categoryMap]
  const intIdx = parseInt(index)
  const rest = intIdx%100 > 0 ? 0 : -1

  const start = (Math.floor(intIdx/100 + rest) * 100 + 1).toString().padStart(4, '0')
  const end = (Math.ceil(intIdx/100) * 100).toString().padStart(4, '0')
  const current = intIdx.toString().padStart(4, '0')

  const p =   `docs/btnews/${category}/${start}_${end}`
  const fp = `${p}/${category}_${current}.md`
  return {
    p,
    fp,
    index: intIdx,
    category
  }
}
async function main() {
  // options
  let bvid = options.bv

  if(!options.bv) {
    bvid = await getNewestVideoByCategory(options.category)
  }
  const detail = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`).then(res => res.json())
  const title = detail.data.title
  const description = detail.data.desc?.replaceAll('\n', '')
  const cid = detail.data.cid
  const avid = detail.data.aid
  const pubtime =  detail.data.pubdate // timestamp 10
  const {p, category, index,fp} = getPathAndIndexByTitle(title)
  let exist = false
  if(fs.existsSync(fp)) {
    exist = true
  }
  ghac.setOutput('exist', exist);
  ghac.setOutput('path', p);
  ghac.setOutput('filepath', fp);
  ghac.setOutput('index', index);
  ghac.setOutput('title', title);
  ghac.setOutput('avid', avid);
  ghac.setOutput('bvid', bvid);
  ghac.setOutput('cid', cid);
  ghac.setOutput('date', pubtime);
  ghac.setOutput('description', description);
  ghac.setOutput('category', category);
}


main()