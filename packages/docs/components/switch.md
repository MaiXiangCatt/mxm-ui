---
title: Switch
description: Switch 开关

next:
  link: '/components/form'
  text: 'Form 表单'

prev:
  link: '/components/select'
  text: 'Select 选择器'
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。

::: preview
demo-preview=../demo/Switch/Basic.vue
:::

## 尺寸

可以使用 `size` 属性来调整按钮大小，除默认大小外，我们还提供了 `large` 和 `small` 两种尺寸。

::: preview
demo-preview=../demo/Switch/Size.vue
:::

## 扩展的value类型

你可以设置 `active-value` 和 `inactive-value` 属性， 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

::: preview
demo-preview=../demo/Switch/Value.vue
:::

## 禁用状态

设置 `disabled` 属性，接受一个`Boolean`，设置`true`即可禁用。

::: preview
demo-preview=../demo/Switch/Disabled.vue
:::

## Switch API

### Switch Props

| 名称                 | 说明                    | 类型                          | 默认值  |
| -------------------- | ----------------------- | ----------------------------- | ------- |
| modelValue / v-model | 绑定值                  | `boolean \| string \| number` | `—`     |
| disabled             | 是否禁用                | `boolean`                     | `false` |
| activeText           | switch 打开时的文字描述 | `string`                      | `—`     |
| inactiveText         | switch 关闭时的文字描述 | `string`                      | `—`     |
| activeValue          | switch 打开时的值       | `boolean \| string \| number` | `true`  |
| inactiveValue        | switch 关闭时的值       | `boolean \| string \| number` | `false` |
| name                 | 原生 name 属性          | `string`                      | `—`     |
| id                   | 原生 id 属性            | `string`                      | `—`     |
| size                 | Switch 的尺寸           | `'small' \| 'large'`          | `—`     |

### Switch Events

| 名称     | 说明               | 类型                                           |
| -------- | ------------------ | ---------------------------------------------- |
| `change` | 开关状态改变时触发 | `(value: boolean \| string \| number) => void` |

### Switch Exposes

| 名称      | 说明                             | 类型                   |
| --------- | -------------------------------- | ---------------------- |
| `focus`   | 使 Switch 组件获得焦点           | `() => void`           |
| `checked` | Switch 当前是否为选中状态 (只读) | `ComputedRef<boolean>` |
