---
title: Select
description: Select 选择器

next:
  link: '/components/switch'
  text: 'Switch 开关'

prev:
  link: '/components/input'
  text: 'Input 输入框'
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选。 `v-model` 的值为当前被选中的 `mxm-option` 的 value 属性值。可以通过props中的 `options` 和语义化地使用 `<mxm-option>`两种方式创建选项。

::: preview
demo-preview=../demo/Select/Basic.vue
:::

## 有禁用选项

在 `mxm-option` 中，设定 `disabled` 值为 true，即可禁用该选项

::: preview
demo-preview=../demo/Select/Disabled.vue
:::

## 禁用状态

为 `mxm-select` 设置 `disabled` 属性，则整个选择器不可用。

::: preview
demo-preview=../demo/Select/DisabledSelect.vue
:::

## 可清空单选

为 `mxm-select` 设置 `clearable` 属性，则可将选择器清空。

::: preview
demo-preview=../demo/Select/Clearable.vue
:::

## 自定义模板

你可以自定义如何来渲染每一个选项。将自定义的 HTML 模板插入 `mxm-option` 的 slot 中即可。

::: preview
demo-preview=../demo/Select/VNode.vue
:::

## 筛选功能

可以利用筛选功能快速查找选项。

为mxm-select添加filterable属性即可启用搜索功能。 默认情况下，Select 会找出所有 label 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 filter-method 来实现。 filter-method 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。

::: preview
demo-preview=../demo/Select/Filterable.vue
:::

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为true，同时传入一个`remote-method`。 `remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。

::: preview
demo-preview=../demo/Select/Remote.vue
:::

## Select API

### Select Props

| 名称               | 说明               | 类型                                                      | 默认值  |
| ------------------ | ------------------ | --------------------------------------------------------- | ------- |
| modelValue/v-model | 绑定值             | `string`                                                  | `—`     |
| id                 | 原生 id 属性       | `string`                                                  | `—`     |
| options            | 下拉框选项数组     | `SelectOptionProps[]`                                     | `[]`    |
| placeholder        | 占位文本           | `string`                                                  | `-`     |
| disabled           | 是否禁用           | `boolean`                                                 | `false` |
| clearable          | 是否可清空         | `boolean`                                                 | `false` |
| renderLabel        | 自定义选项渲染函数 | `(option: SelectOptionProps) => VNode \| string`          | `—`     |
| filterable         | 是否可筛选         | `boolean`                                                 | `false` |
| filterMethod       | 自定义筛选函数     | `(value: string) => SelectOptionProps[]`                  | `—`     |
| remote             | 是否为远程搜索     | `boolean`                                                 | `false` |
| remoteMethod       | 远程搜索函数       | `(value: string) => Promise<SelectOptionProps[] \| void>` | `—`     |

### Select Events

| 名称             | 说明                   | 类型                       |
| ---------------- | ---------------------- | -------------------------- |
| `change`         | 选中值改变时触发       | `(value: string) => void`  |
| `visible-change` | 下拉框显示或隐藏时触发 | `(value: boolean) => void` |
| `clear`          | 点击清空按钮时触发     | `() => void`               |
| `focus`          | 获得焦点时触发         | `() => void`               |
| `blur`           | 失去焦点时触发         | `() => void`               |

### Select Exposes

| 名称    | 说明             | 类型         |
| ------- | ---------------- | ------------ |
| `focus` | 使选择器获得焦点 | `() => void` |
| `blur`  | 使选择器失去焦点 | `() => void` |

## Option API

### Option Props

| 名称     | 说明           | 类型      | 默认值  |
| -------- | -------------- | --------- | ------- |
| value    | 选项的唯一标识 | `string`  | `—`     |
| label    | 选项的显示文本 | `string`  | `—`     |
| disabled | 是否禁用该选项 | `boolean` | `false` |
