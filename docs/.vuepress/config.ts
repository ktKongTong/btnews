import { defineUserConfig } from 'vuepress'
import {backToTopPlugin} from "@vuepress/plugin-back-to-top";
import {externalLinkIconPlugin} from "@vuepress/plugin-external-link-icon";
import {nprogressPlugin} from "@vuepress/plugin-nprogress";

export default defineUserConfig({
    lang: 'zh-CN',
    title: '睡前消息文稿集合',
    description: '睡前消息文稿集合，通过 whisper 模型进行语音识别，生成往期文稿集合',
    plugins: [
        backToTopPlugin(),
        externalLinkIconPlugin(),
        nprogressPlugin(),
    ],
})