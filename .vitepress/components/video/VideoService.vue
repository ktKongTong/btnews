<script setup lang="ts">
import Youtube from "./Youtube.vue";
import BiliBili from "./BiliBili.vue";
import XiGua from "./XiGua.vue";
import TabGroup from "../tab/TabGroup.vue";
import TabPanel from "../tab/TabPanel.vue";
import {computed, toRefs} from 'vue';
interface VideoProps {
  provider: Provider;
  id: string;
}
type Provider ="Bilibili" | "Youtube" | "bilibili" | "youtube"
const providerMap = {
    "Bilibili": BiliBili,
    "bilibili": BiliBili,
    "Youtube": Youtube,
    "youtube": Youtube,
    "XiGua": XiGua,
    "xigua": XiGua,
}
const props = defineProps<{
    videos: VideoProps[],
}>()

const getComponent = (provider: Provider) => {
    return providerMap[provider]
}
const id = computed(() => {
  return props.videos[0].id
})

</script>

<template>
    <div class="player-wrapper" id="player">
        <ClientOnly>
            <TabGroup defaultKey="0" v-if="videos.length > 1">
                    <TabPanel :label="provider" :actKey="index.toString()" :key="id"   v-for="({provider,id}, index)  in props.videos">
                        <div style="position: relative; padding: 30% 45%;">
                            <component :is="providerMap[provider]" :id="id" start="0" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;border-radius: 10px;" />
                        </div>
                    </TabPanel>
             </TabGroup>
             <div style="position: relative; padding: 30% 45%;"
                  v-else-if="videos.length == 1"
                  >
                <component :is="getComponent(props.videos[0].provider)" :id="id" start="0" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;border-radius: 10px;" />
            </div>
        </ClientOnly>
    </div>
</template>