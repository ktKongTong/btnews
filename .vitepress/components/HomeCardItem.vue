<script setup lang="ts">
import {toRefs} from "vue";

interface Article {
  id: string,
  date: string,
  title: string,
  category?: string,
  index?: string,
  description: string,
  ytid?: string,
  bvid?: string,
  xgid?: string,
  wbid?: string,
  wcid?: string,
  tags: string[],
}

import Tag from './Tag.vue';
import Bilibili from "./icons/bilibili.vue";
import Weibo from "./icons/weibo.vue";
import Xigua from "./icons/xigua.vue";
import Youtube from "./icons/youtube.vue";
const props = defineProps<{
  article: Article
}>()
const {title, description, tags, date, ytid, bvid, category,id} = toRefs(props.article)
// yyyy-mm-dd weekday
let dateFormat = new Date(date.value)
let dateFormated = dateFormat.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })


</script>
<template>
    <div class="card-item">
      <a class="card-header hover:underline decoration-dotted hover:text-blue-700 underline-offset-4 " :href="id">
        {{ title }}
      </a>
      <div class="card-body">
        <div style="">
          <div class="card-item-source space-x-1 *:p-0.5 ">
            <div v-if="article.ytid" class="flex hover:text-blue-400 ">
              <a :href="`https://youtu.be/${article.ytid}`" target="_blank"><youtube/></a>
            </div>
            <div v-if="article.bvid" class="flex hover:text-blue-400">
              <a :href="`https://b23.tv/${article.bvid}`" target="_blank"><bilibili/></a>
            </div>
            <div v-if="article.xgid" class="flex hover:text-blue-400">
              <a :href="`https://www.ixigua.com/${article.xgid}`" target="_blank"><xigua/></a>
            </div>
            <div v-if="article.wbid" class="flex hover:text-blue-400">
              <a :href="`https://weibo.com/tv/show/${article.wbid}`" target="_blank"><weibo/></a>
            </div>
          </div>
          <div class="card-item-date">
            {{ dateFormated }}
          </div>
          <div class="card-item-tags" v-if="tags&&tags.length>0">
            <Tag v-for="tag in tags" :key="tag" :tag="tag" class="tag-item"/>
          </div>
        </div>
        <div class="card-item-description text-overflow" v-html="description">
      </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
.card-item{
    //max-width: 256px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.card-item:hover{
    border: 1px solid var(--theme-color);
    box-shadow: 0 0 5px var(--theme-color);
}

.text-overflow > a
{
  font-weight: normal;
  color: var(--theme-color);
}
.text-overflow{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
.card-header{
    font-size: 1.5rem;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.card-body{
  margin: 0 0rem;
}
.card-item-date{
    cursor:default;
    font-size: 1rem;
}
.card-item-description{
    font-size: 1rem;
    cursor:default;
    -webkit-line-clamp: 4;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.card-item-description > figure{
    display: flex !important;
    flex-direction: column !important;
}


.card-item-tags{
    margin: 0.1rem 1rem;
    display: flex;
    flex-wrap: wrap;
 }
 .tag-item{
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
 }
.card-item-source{
  display: flex;
  gap: 4px;
}
</style>