<script setup lang="ts">
interface XiguaProps {
  id: string,
  start?: string
}
import {computed} from "vue";
const props =  defineProps<XiguaProps>()
const src = computed(()=>{
  return `https://www.ixigua.com/iframe/${props.id}?autoplay=0&startTime=${props.start ?? 0}`
})
</script>
<template>
    <iframe 
    :src="src"
    frameborder="0" allowfullscreen 
     referrerpolicy="unsafe-url">
    </iframe>
</template>