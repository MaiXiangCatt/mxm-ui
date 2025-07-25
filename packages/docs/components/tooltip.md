---
title: Tooltip
description: Tooltip 组件文档

next:
  link: /components/form
  text: Form 表单

prev:
  link: /components/input
  text: Input 输入框
---

# Tooltip 文字提示

文字提示，在鼠标 hover 时显示提示文字。

::: tip
todo: 目前只是做了简单封装，待完善(effect 部分)
:::

## 基础用法

提供9种方向的展示方式，使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

::: preview
demo-preview=../demo/Tooltip/Basic.vue
:::

## 更多内容的文字提示

展示多行文本或者设置内容的格式
通过 `content` 具名插槽设置内容，代替`content`属性

::: preview
demo-preview=../demo/Tooltip/Slot.vue
:::

## 禁用状态

禁用状态，鼠标悬停无法触发文字提示。`disabled` 属性可以满足这个需求。

::: preview
demo-preview=../demo/Tooltip/Disabled.vue
:::

## Tooltip API

### Tooltip Props

| 名称           | 说明        | 类型                                                     | 默认值 |
| -------------- | ----------- | -------------------------------------------------------- | ------ |
| content        | 提示文字    | `string`                                                 | -      |
| disabled       | 是否禁用    | `boolean`                                                | false  |
| placement      | 弹出位置    | `string`                                                 | bottom |
| trigger        | 触发方式    | `string`                                                 | hover  |
| manual         | 手动控制    | `boolean`                                                | false  |
| popper-options | popper 配置 | `object` 参考[popper.js](https://popper.js.org/docs/v2/) | {}     |
| transition     | 动画        | `string`                                                 | fade   |
| show-timeout   | 显示延时    | `number`                                                 | 0      |
| hide-timeout   | 隐藏延时    | `number`                                                 | 200    |

### Tooltip Events

| 事件名         | 说明                   | 类型                         |
| -------------- | ---------------------- | ---------------------------- |
| visible-change | 显示隐藏状态改变时触发 | `(visible: boolean) => void` |
| click-outside  | 点击外部时触发         | `() => void`                 |

### Tooltip Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| content | 内容插槽 |

### Tooltip Expose

| 名称 | 说明 | 类型         |
| ---- | ---- | ------------ |
| show | 显示 | `() => void` |
| hide | 隐藏 | `() => void` |
