---
title: Collapse
description: Collapse 组件文档

next:
  link: /components/alert
  text: Alert 提示

prev:
  link: /components/collapse
  text: Collapse 折叠面板
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

通过组件 slot 来设置下拉触发的元素以及需要通过具名 slot 为 `dropdown` 来设置下拉菜单。

::: preview
demo-preview=../demo/Dropdown/Basic.vue
:::

## 触发方式

通过设置 `trigger` 属性来改变触发方式。

::: preview
demo-preview=../demo/Dropdown/Trigger.vue
:::

## 点击菜单隐藏

可以通过 `hide-on-click` 属性来配置。
下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 false 可以关闭此功能。

::: preview
demo-preview=../demo/Dropdown/HideOnClick.vue
:::

# 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 `command` 进行不同的操作。

::: preview
demo-preview=../demo/Dropdown/Command.vue
:::

## 下拉方法

可以手动使用 `DropdownInstance.open` 或 `DropdownInstance.close` 以打开或关闭下拉菜单

::: preview
demo-preview=../demo/Dropdown/InstanceMethod.vue
:::

## 禁用状态

通过设置 `disabled` 属性来禁用下拉菜单。

::: preview
demo-preview=../demo/Dropdown/Disabled.vue
:::

## 触发对象

设置 `split-button` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮。

::: preview
demo-preview=../demo/Dropdown/SplitButton.vue
:::

## 尺寸

通过设置 `size` 属性来改变下拉菜单和按钮的尺寸。

::: preview
demo-preview=../demo/Dropdown/Size.vue
:::

## Dropdown API

### Dropdown Props

| 属性名       | 说明                                            | 类型                                                                                    | Default |
| ------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| type         | 菜单按钮类型                                    | 同 Button 组件 的 type                                                                  | --      |
| size         | 菜单尺寸                                        | 同 Button 组件 的 size                                                                  | --      |
| split-button | 下拉触发元素呈现为按钮                          | `boolean`                                                                               | false   |
| disabled     | 是否禁用                                        | `boolean`                                                                               | false   |
| trigger      | 触发方式                                        | `'hover' \| 'click'  \| 'contextmenu'`                                                  | hover   |
| placement    | 弹出位置                                        | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \|...` | bottom  |
| hideOnClick  | 点击菜单项时是否隐藏下拉菜单                    | `boolean`                                                                               | true    |
| show-timeout | 展开下拉菜单的延时,仅在 trigger 为 hover 时有效 | `number`                                                                                | 150     |
| hide-timeout | 收起下拉菜单的延时,仅在 trigger 为 hover 时有效 | `number`                                                                                | 150     |

### Dropdown Events

| 事件名         | 说明                                        | 类型                                 |
| -------------- | ------------------------------------------- | ------------------------------------ |
| click          | `split-buttton` 为 true 时,点击左侧按钮触发 | `(event: MouseEvent) => void`        |
| visible-change | 下拉菜单显示或隐藏时触发                    | `(visible: boolean) => void`         |
| command        | 点击菜单项时触发                            | `(command: string\| number) => void` |

### Dropdown Slots

| 插槽名   | 说明     | 子标签       |
| -------- | -------- | ------------ |
| default  | 默认插槽 | -            |
| dropdown | 下拉菜单 | DropdownItem |

### Dropdown Expose

| 方法名 | 说明         | Type         |
| ------ | ------------ | ------------ |
| open   | 打开下拉菜单 | `() => void` |
| close  | 关闭下拉菜单 | `() => void` |

## DropdownItem API

### DropdownItem Props

| 属性名   | 说明       | 类型               | Default |
| -------- | ---------- | ------------------ | ------- |
| command  | 菜单项指令 | `string \| number` | -       |
| label    | 菜单项文本 | `string`           | -       |
| disabled | 禁用状态   | `boolean`          | false   |
| divider  | 添加分割线 | `boolean`          | false   |

### DropdownItem Slots

| 插槽名  | 说明                               |
| ------- | ---------------------------------- |
| default | 默认插槽, 优先级高于 `props.label` |
