---
title: Alert
description: Alert组件文档
next:
  link: '/components/message'
  text: 'Message 消息提示'
prev:
  link: '/components/dropdown'
  text: 'Dropdown 下拉菜单'
---

# Alert 提示

## 基础用法

Alert 组件不属于浮层元素，不会自动消失或关闭。

Alert 组件提供五种类型，由 `type` 属性指定，为 `primary | success | warning | danger | info` , 默认值为 `info`。

::: preview
demo-preview=../demo/Alert/Basic.vue
:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。通过设置 `effect` 属性来改变主题，默认为 `light`。

::: preview
demo-preview=../demo/Alert/Theme.vue
:::

## 是否可关闭

可以设置 Alert 组件是否为可关闭状态， `closable` 属性决定 Alert 组件是否可关闭， 该属性接受一个 `Boolean`，默认为 `true`。

::: preview
demo-preview=../demo/Alert/Close.vue
:::

## 展示图标

通过设置 `show-icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

::: preview
demo-preview=../demo/Alert/ShowIcon.vue
:::

## 文字居中

使用 `center` 属性来让文字水平居中。

::: preview
demo-preview=../demo/Alert/TextCenter.vue
:::

## 文字描述

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。

::: preview
demo-preview=../demo/Alert/Desc.vue
:::

## 带图标和描述

在最后, 这是一个带有图标和描述的例子。

::: preview
demo-preview=../demo/Alert/IconDesc.vue
:::

## Alert API

### Alert Props

| 名称        | 描述         | 类型                                                              | 默认值 |
| ----------- | ------------ | ----------------------------------------------------------------- | ------ |
| title       | Alert 标题   | `string`                                                          | —      |
| type        | Alert 类型   | `enum` - `'primary' \| 'success'\| 'warning'\| 'danger'\| 'info'` | info   |
| description | 描述性文本   | `string`                                                          | —      |
| closable    | 是否可以关闭 | `boolean`                                                         | true   |
| center      | 文字是否居中 | `boolean`                                                         | false  |
| show-icon   | 是否展示图标 | `boolean`                                                         | false  |
| effect      | 主题样式     | `enum` - `'light'\| 'dark'\`                                      | light  |

### Alert Events

| 名称  | 描述                    | 类型                         |
| ----- | ----------------------- | ---------------------------- |
| close | 关闭 Alert 时触发的事件 | `(event: MouseEvent)=> void` |

### Alert Slots

| 名称    | 描述                                |
| ------- | ----------------------------------- |
| default | 默认插槽，用于设置 Alert 的内容描述 |
| title   | 标题的内容                          |

### Alert Expose

| 名称  | 描述       | 类型         |
| ----- | ---------- | ------------ |
| open  | 打开 Alert | `() => void` |
| close | 关闭 Alert | `() => void` |
