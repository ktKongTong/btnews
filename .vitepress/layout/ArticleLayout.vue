<script setup>
  import DefaultTheme from 'vitepress/theme'
  import {useData} from "vitepress";
  import VideoService from "../components/video/VideoService.vue";
  import HomeCardItem from "../components/HomeCardItem.vue";
  import { data as recent } from '../../content/recent.data'
  import {computed, ref} from "vue";
  import {merge} from "radash";
  import { Calendar,Tag,Hourglass } from 'lucide-vue-next';

  const { Layout } = DefaultTheme

  const data = useData()

  const tabContent = computed(()=> {
    let current = []
    let res = merge(data.params.value,data.page.value.frontmatter)
    const {bvid, ytid, xgid} = res
    if (bvid) {
      current.push({provider: "Bilibili", id: bvid})
    }
    if(ytid) {
      current.push({provider: "Youtube", id: ytid})
    }
    if(xgid) {
      current.push({provider: "XiGua", id: xgid})
    }
    console.log('tabContent Update',current)
    return current
  })
  const frontmatter = computed(()=> {
    return data.params.value
  })
  const dateformat = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('zh-cn', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  const showBanner = ref(true)
  const removeLayoutHeight = ()=> {
    showBanner.value = false
    document.documentElement.style.setProperty("--vp-layout-top-height", "0px");
  }

</script>

<template>
  <Layout>
    <template #layout-top v-if="showBanner">
      <div class="w-full items-center font-bold text-white flex m-auto p-2 fixed h-16 z-50  bg-blue-500 dark:bg-blue-300">
          <span class="break-all m-auto">
            已迁移至 vitepress，同步新内容（如高见）！
            不过仍可访问<a href="https://vp-btnews.ktlab.io" class="text-blue-200">旧版</a>，但不会再有内容更新
          </span>
        <div class="p-2 cursor-pointer" v-on:click="removeLayoutHeight()">
          x
        </div>
      </div>
    </template>
    <template #doc-before  v-if="!frontmatter?.catalog">
      <h1 class="text-2xl font-bold">
        {{frontmatter.title}}
      </h1>
      <div class="metadata p-2 flex gap-2 flex-wrap">
        <div class="flex items-center space-x-1">
          <Calendar size="16" />
          <span class="text-sm">{{dateformat(frontmatter.date)}}</span>
        </div>
        <div class="flex space-x-1 items-center">
          <Hourglass size="16" />
          <span class="text-sm">{{frontmatter.readingTime?.words}} 字</span>
        </div>
        <div class="flex space-x-1 items-center" v-if="frontmatter.tags.length > 0">
          <Tag size="16" />
          <span v-for="(tag,idx) in frontmatter.tags" :key="idx">{{tag}}</span>
        </div>
      </div>
      <div>
        <VideoService :videos="tabContent"/>
      </div>
    </template>
    <template #home-hero-after>
<!--   take recent article & show it -->
      <div class="vp-feature">
        <div class="container grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <div class="content" v-for="(item,index) in recent.slice(0,3)" :key="index">
            <HomeCardItem :article="item" />
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>
<style scoped>
  .vp-feature {
    position: relative;
    padding: 0 24px;
  }
  @media (min-width: 640px) {
    .vp-feature {
      padding: 0 48px;
    }
  }

  @media (min-width: 960px) {
    .vp-feature {
      padding: 0 64px;
    }
  }
  .container{
    margin: 0 auto;
    max-width: 1152px;
  }

</style>