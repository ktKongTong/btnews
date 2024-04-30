<script setup lang="ts">
interface BiliBiliProps {
  id: string,
  start?: string
}
import {computed} from "vue";
       const props =  defineProps<BiliBiliProps>()
    const src = computed(()=>{
      return `https://player.bilibili.com/player.html?bvid=${props.id}&autoplay=0&t=${props.start ?? 0}`
    })
</script>
<template>
        <iframe
            :src="src"
            style="background: var(--bg-color);"
            scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
        </iframe>
</template>