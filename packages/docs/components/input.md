---
title: Input
description: Input 组件文档

next:
  link: '/components/select'
  text: 'Select 选择器'

prev:
  link: '/components/tooltip'
  text: 'Tooltip 文字提示'
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

:::preview
demo-preview=../demo/Input/Basic.vue
:::

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

:::preview
demo-preview=../demo/Input/Disabled.vue
:::

## 一键清空

使用 `clearable` 属性即可得到一个可一键清空的输入框

:::preview
demo-preview=../demo/Input/Clearable.vue
:::

## 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

:::preview
demo-preview=../demo/Input/Showpassword.vue
:::

## 带图标的输入框

要在输入框中添加图标，可以使用具名slot `prefix` 和 `suffix` 。

:::preview
demo-preview=../demo/Input/WithIcon.vue
:::

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

:::preview
demo-preview=../demo/Input/Textarea.vue
:::

## 复合型输入框

可以在输入框前置或后置一个元素，通常是标签或按钮。使用具名slot `prepend` 和 `append`来指定在 Input 中分发的前置或者后置的内容。

:::preview
demo-preview=../demo/Input/Prepend.vue
:::

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small` 。

:::preview
demo-preview=../demo/Input/Size.vue
:::

## Input API

### Input Props

| 属性名               | 说明                   | 类型                 | 默认值   |
| -------------------- | ---------------------- | -------------------- | -------- |
| modelValue / v-model | 绑定值                 | `string`             | `—`      |
| type                 | 原生 input 类型        | `string`             | `'text'` |
| size                 | 输入框尺寸             | `'small' \| 'large'` | `—`      |
| disabled             | 是否禁用               | `boolean`            | `false`  |
| clearable            | 是否可清空             | `boolean`            | `false`  |
| showPassword         | 是否显示密码切换按钮   | `boolean`            | `false`  |
| placeholder          | 输入框占位文本         | `string`             | `—`      |
| readonly             | 是否只读               | `boolean`            | `false`  |
| autocomplete         | 原生 autocomplete 属性 | `string`             | `'off'`  |
| autofocus            | 是否自动获取焦点       | `boolean`            | `false`  |
| form                 | 原生 form 属性         | `string`             | `—`      |

### Input Events

| 事件名   | 说明                     | 类型                          |
| -------- | ------------------------ | ----------------------------- |
| `input`  | 输入值变化时触发         | `(value: string) => void`     |
| `change` | 值改变后，失去焦点时触发 | `(value: string) => void`     |
| `focus`  | 输入框获得焦点时触发     | `(event: FocusEvent) => void` |
| `blur`   | 输入框失去焦点时触发     | `(event: FocusEvent) => void` |
| `clear`  | 点击清空按钮时触发       | `() => void`                  |

### Input Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

### Input Exposes

| 名称     | 说明                       | 类型                                                   |
| -------- | -------------------------- | ------------------------------------------------------ |
| `ref`    | HTML元素 input 或 textarea | `Ref<HTMLInputElement \| HTMLTextAreaElement \| void>` |
| `focus`  | 使输入框获得焦点           | `() => Promise<void>`                                  |
| `blur`   | 使输入框失去焦点           | `() => void`                                           |
| `select` | 选中输入框中的所有文本     | `() => void`                                           |
| `clear`  | 清空输入框的值             | `() => void`                                           |
