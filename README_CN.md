# friday-story

friday story是基于fridayboot-election的视觉小说游戏框架，主要方向为类QSP、AVG

## 为什么不直接使用Renpy

1. 视频兼容格式少，且在测试时开始界面，内容页面均未能实现正常播放视频
2. 样式修改起来还是vue更顺手一些



## 已实现功能

- 存档模块
- 地图模块
- 故事模块
- 商店模块
- 背包模块

## 页面预览

![登录页](project/login.png)

![新存档](project/1722248556522.png)

![首页](project/1722248333302.png)

![成就页](project/1722248635251.png)

![商店页](project/1722248986270.png)

![背包页](project/1722248993153.png)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Project Setup

### Install

```bash
$ pnpm i
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

## 怎么添加自定义的故事？

所有数据都在`/src/renderer/src/constants/data/`下，格式参照对应的定义，暂无详细文档介绍

剧情脚本推荐存储在`/static/scripts/`下，剧情使用Renpy脚本编写，自定义实现部分语法，详情可参照`demo.rpy`

### 1. 添加Story

> 添加目录：/src/renderer/src/constants/data/stories/yourStory.ts

```ts
export const DemoStories: Array<Dto.StoryPlot> = [
  {
    name: 'demo',
    type: 'main-line',
    script: '/static/scripts/demo.rpy', // 对应后续添加的Renpy脚本
    cover: '',
    text: ['本故事纯属虚构，如有雷同纯属巧合']
  }
]
```

### 2. 添加Renpy脚本（仅应用Renpy的格式，自定义实现解析）

> 添加目录：/static/scripts/yourStory.rpy

可参照demo.rpy进行修改，大部分与Renpy含义一致，仅支持部分语法

- label对应场景
- menu对应选项
- scene 'src' 对应背景图
- show 'src' 对应显示角色图片
- jump label 切换场景
