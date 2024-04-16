<script setup lang="ts">
import Youtube from "./Youtube.vue";
import BiliBili from "./BiliBili.vue";
import XiGua from "./XiGua.vue";
import TabGroup from "../tab/TabGroup.vue";
import TabPanel from "../tab/TabPanel.vue";
import {toRefs} from 'vue';
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
const {videos} = toRefs(props)
const getComponent = (provider: Provider) => {
    return providerMap[provider]
}
</script>

<template>
    <div class="player-wrapper" id="player">
        <ClientOnly>
            <TabGroup defaultKey="0" v-if="videos.length > 1">
                    <TabPanel :label="provider" :actKey="index.toString()" :key="id"   v-for="({provider,id}, index)  in videos">
                        <div style="position: relative; padding: 30% 45%;">
                            <component :is="providerMap[provider]" :id="id" start="0" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;border-radius: 10px;" />
                        </div>
                    </TabPanel>
             </TabGroup>
             <div style="position: relative; padding: 30% 45%;" v-else-if="videos.length == 1">
                <component :is="getComponent(videos[0].provider)" :id="videos[0].id?.toString()" start="0" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;border-radius: 10px;" />
            </div>
        </ClientOnly>
    </div>
</template>