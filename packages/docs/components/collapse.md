---
title: Collapse
description: Collapse组件文档
next:
  link: '/components/dropdown'
  text: 'Dropdown 下拉菜单'
prev:
  link: '/components/button'
  text: 'Button 按钮'
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

::: preview
demo-preview=../demo/Collapse/Basic.vue
:::

## 手风琴模式

通过 `accordion` 属性来设置是否以手风琴模式显示。

::: preview
demo-preview=../demo/Collapse/Accordion.vue
:::

## 自定义面板标题

通过具名 slot 来实现自定义面板的标题内容，以实现增加图标等效果。

::: preview
demo-preview=../demo/Collapse/CustomTitle.vue
:::

## 禁用状态

通过 `disabled` 属性来设置 CollapseItem 是否禁用。

::: preview
demo-preview=../demo/Collapse/Disabled.vue
:::

## Collapse API

### Collapse Props

| Name      | Description        | Type                 | Default |
| --------- | ------------------ | -------------------- | ------- |
| v-model   | 当前展开项的 name  | `CollapseItemName[]` | []      |
| accordion | 是否开启手风琴模式 | `boolean`            | false   |

### Collapse Events

| Name   | Description    | Type                                 |
| ------ | -------------- | ------------------------------------ |
| change | 切换面板时触发 | `(name: CollapseItemName[]) => void` |

### Collapse Slots

| Name    | Description | Sub Component |
| ------- | ----------- | ------------- |
| default | 默认插槽    | CollapseItem  |

## CollapseItem API

### CollapseItem Props

| Name     | Description | Type               | Default |
| -------- | ----------- | ------------------ | ------- |
| name     | 唯一标识符  | `CollapseItemName` | -       |
| title    | 面板标题    | `string`           | ""      |
| disabled | 是否禁用    | `boolean`          | false   |

### CollapseItem Slots

| Name    | Description                 |
| ------- | --------------------------- |
| default | 默认插槽 ,CollapseItem 内容 |
| title   | CollapseItem 的标题         |

::: tip
上文 `CollapseItemName` 类型，为 `string | number` 类型。
:::
