---
title: Button
description: Button组件文档
next:
  link: '/components/collapse'
  text: 'Collapse折叠面板'
prev:
  link: '/get-started'
  text: '快速开始'
---

# Button 按钮

常用的操作按钮

## 基础用法

使用`type`, `plain`, `round`和`circle`来定义按钮样式。

:::preview
demo-preview=../demo/Button/Basic.vue
:::

## 禁用状态

可以使用`disabled`属性来定义按钮是否被禁用，该属性接收一个`boolean`类型的值。

:::preview
demo-preview=../demo/Button/Disabled.vue
:::

## 图标按钮

可以使用`icon`属性来为按钮添加图标, 可以在Icon 组件中找到所需图标。

:::preview
demo-preview=../demo/Button/Icon.vue
:::

## 按钮组

以按钮组的方式出现，常用于多项类似操作。使用`<mxm-button-group>`对多个按钮分组。

:::preview
demo-preview=../demo/Button/ButtonGroup.vue
:::

## 加载状态按钮

通过设置`loading`属性来显示加载中状态。

:::tip
可以使用 loading 插槽或 loadingIcon属性自定义您的loading图标。loading插槽的优先级高于loadingIcon属性。
:::

:::preview
demo-preview=../demo/Button/Loading.vue
:::

## 调整尺寸

除默认大小，按钮组件还可以调整尺寸。使用`size`属性配置尺寸，可使用`large`和`small`两种值

:::preview
demo-preview=../demo/Button/Size.vue
:::

## Tag

您可以自定义元素标签。例如，按钮，div，路由链接，nuxt链接。

:::preview
demo-preview=../demo/Button/Tag.vue
:::

## 节流模式

可以使用`useThrottle`属性来启用节流模式，默认为`true`。

:::preview
demo-preview=../demo/Button/Throttle.vue
:::

## Button API

### Button Props

| 属性名            | 说明                            | 类型                                                           | 默认值  |
| ----------------- | ------------------------------- | -------------------------------------------------------------- | ------- |
| size              | 尺寸                            | `enum - 'large'\| 'default'\| 'small'`                         | -       |
| type              | 类型                            | `enum - 'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | info    |
| plain             | 是否为朴素按钮                  | `boolean`                                                      | false   |
| round             | 是否为圆角按钮                  | `boolean`                                                      | false   |
| circle            | 是否为圆形按钮                  | `boolean`                                                      | false   |
| loading           | 是否为加载中状态                | `boolean`                                                      | false   |
| loading-icon      | 自定义加载中状态图标组件        | `string`                                                       | spinner |
| disabled          | 按钮是否为禁用状态              | `boolean`                                                      | false   |
| icon              | 按钮图标                        | `string`                                                       | -       |
| autofocus         | 是否自动聚焦(原生autofocus属性) | `boolean`                                                      | false   |
| native-type       | 原生 type 属性                  | `enum - 'button'\| 'submit'\| 'reset'`                         | button  |
| tag               | 自定义元素标签                  | `string/Component`                                             | button  |
| use-throttle      | 是否使用节流模式                | `boolean`                                                      | true    |
| throttle-duration | 节流模式下，节流时间间隔(ms)    | `number`                                                       | 500     |

### Button Slots

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 自定义默认内容   |
| loading | 自定义加载中组件 |
| icon    | 自定义图标组件   |

### Button Expose

| 属性名   | 说明           | 类型                                  |
| -------- | -------------- | ------------------------------------- |
| ref      | 按钮 html 元素 | `Ref<HTMLButtonElement>`              |
| size     | 按钮尺寸       | `ComputedRef<''\|'small' \|'large'>`  |
| type     | 按钮类型       | `ComputedRef<'' \| 'primary' \| ...>` |
| disabled | 按钮禁用状态   | `ComputedRef<boolean>`                |

## ButtonGroup API

### ButtonGroup Props

| 属性名   | 说明                 | 类型                                                           | 默认值  |
| -------- | -------------------- | -------------------------------------------------------------- | ------- |
| size     | 尺寸                 | `enum - 'large'\| 'default'\| 'small'`                         | `—`     |
| type     | 类型                 | `enum - 'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | `info`  |
| disabled | 按钮组是否为禁用状态 | `boolean`                                                      | `false` |

### ButtonGroup Slots

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 | Button |
