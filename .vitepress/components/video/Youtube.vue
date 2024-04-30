<script setup lang="ts">
  import {computed} from "vue";
  interface YoutubeProps {
    id: string,
    start?: string
  }
  const props =  defineProps<YoutubeProps>()
  const src = computed(()=> {
    return `https://www.youtube-nocookie.com/embed/${props.id}?start=${props.start}`
  })
</script>
<template>
        <iframe
            :src="src"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
</template>