# btnews
[睡前消息文稿合集](https://btnews.vercel.app/)

## 简介
通过 openai 的语言识别模型 [whisper](https://github.com/openai/whisper)，将往期内容归档为 markdown。 

1 ～ 414 期通过 whisper 生成。414期之后均从公众号抓取。

目前的文本内容基本可读，但是缺少图片、链接引用，表现形式还不够好，距离方便阅读还有一段距离（像[568期](https://btnews.vercel.app/btnews/2023/03/26/)这样）
后续内容缓慢补齐。

佛系更新，欢迎PR

## 缺失内容
- 74期
- 140期
- 178期
- 183期
- 353期
- 409期
- 435期
- 473期
- 524期
- 551期
## todo

- [x] 基于日期（年月周）的归档
- [x] 自定义合集归档
- [ ] 标签分类视图
- [ ] 多视频源

## 格式规范
### 名称/路径
1. markdown 文件名称，应当符合 `[分类]_[编号].md` 的格式，这有利于索引，以及自定义视图的生成
    编号应采取 4 位编号，对应期数，不足 4 位应用 0 补齐。
2. 部分期数存在 .5， 用 _5 替代，如 13.5 对应 0013_5，文件名 btnews_0013_5.md

3. 每 100 期划分一个子文件夹，`[起始编号]_[截止编号]` 的格式，如 `0001_0100` 包括 第 1 期到第 100 期， 13.5 期也包含在内。

5. 文件存储路径 `/docs/${category}/${子文件夹}/${category}_${id}.md`

6. 分类名称如下（目前仅有睡前消息）：

|   分类名称    |  类型   |       备注       |
   |:---------:|:-----:|:--------------:|
|  btnews   | 睡前消息  |  bedtime news  |
|  refnews  | 参考消息  | reference news |

### 文件内容

#### frontmatter
这部分用于指示文件的一些基本信息，如标题，日期等

##### 必填项

| frontmatter | 描述                                    |
|:-----------:|:--------------------------------------|
|    date     | 对应稿件投稿日期，格式应为 yyyy-mm-dd，如 2020-04-12 |
|    title    | 稿件标题                                  |

##### 可选项

| frontmatter | 描述                                                                            |
|:-----------:|:------------------------------------------------------------------------------|
|     tag     | 标签，是一个 yaml 字符串数组，如 `tag: ["社会化抚养","房产税"]`，<br/>tag 应当依据文件内容确定，也可以参考对应稿件的 tag |
| description | 页面的描述，可以使用原稿件描述。                                                              |

##### 禁用项
虽然 vuepress 预定义了一些 frontmatter，但有些 frontmatter 不应当使用。这会导致预期外的行为

|        frontmatter         | 描述                                                             |
|:--------------------------:|:---------------------------------------------------------------|
| permalink/permalinkPattern | 文件永久链接，我们约定，文件的永久链接应当为 /${category}/${id}/，在 page 渲染时，会进行一定的检查 |
|           layout           | 布局，相同类型的稿件布局应当一致，采用全局设置                                        |
|          category          | 分类，在渲染时会根据路径自定获取分类，但考虑到可能属于多种类型，暂且保留                           |
|            type            | 用于指明页面类型，插件功能会用到（如替换链接），因此文件中不应使用                              |

##### 考虑中
- link，通过 link 字段指向原始稿件

#### 正文内容
1. 正文内容是根据 openai 的 whisper 模型生成的，内容准确性存在一些问题，需要补充修改。
2. 需要补充图片，添加引用来源。部分链接等应当转为适当的 markdown 格式。
3. 正文文首应添加一个播放器组件，指向原始稿件。
4. 可能的话，考虑添加 备注、comment 等功能



## 关于
just for fun, 源于之前写的另外一个 b 站视频下载工具，完成批量下载功能之后，便用督工的合集测试了一下，效果还不错，
又恰好在看到 openai 的开源模型 whisper，发现效果也不错，便花了点时间建了这个repo，做一个睡前消息的内容归档。
