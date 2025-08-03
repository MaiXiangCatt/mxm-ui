---
search: false
next:
  link: /components/button
  text: Button 按钮
---

# Vue3 + TS的仿ElementPlus组件库

## 安装

```bash
npm i @maixiangcat/mxm-ui --save
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import MxmUI from '@maixiangcat/mxm-ui'
// 引入样式
import '@maixiangcat/mxm-ui/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(MxmUI).mount('#app')
```

```vue
<template>
  <mxm-button>Button</mxm-button>
</template>
```

**按需导入**

Mxm-UI 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <mxm-button>Button</mxm-button>
</template>
<script>
import { MxmButton } from 'mxm-ui'
export default {
  components: { MxmButton },
}
</script>
```
