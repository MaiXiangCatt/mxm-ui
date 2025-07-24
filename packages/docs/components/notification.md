---
title: Notification
description: Notification 组件文档

next:
  link: /components/popconfirm
  text: PopConfirm 气泡确认框

prev:
  link: /components/messagebox
  text: MessageBox 消息弹出框
---

# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。 默认情况下，通知在4500毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。 如果你将它设置为 0，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 Number，单位为毫秒。

::: preview
demo-preview=../demo/Notification/Basic.vue
:::

## 不同类型的通知

我们提供了四种不同类型的提醒框：`success`、`warning`、`info` 和 `error` (danger 效果和 error 相同)。

::: preview
demo-preview=../demo/Notification/Type.vue
:::

## 自定义消息弹出的位置

使用 `position` 属性可以设置 Notification 的弹出位置， 支持四个选项：`top-right`、`top-left`、`bottom-right` 和 `bottom-left`， 默认为 `top-right`。

::: preview
demo-preview=../demo/Notification/Position.vue
:::

## 有位置偏移的通知栏

Notification 提供设置偏移量的功能，通过设置 `offset` 字段，可以使弹出的消息距屏幕边缘偏移一段距离。 注意在同一时刻，每一个的 Notification 实例应当具有一个相同的偏移量。

::: preview
demo-preview=../demo/Notification/Offset.vue
:::

## 隐藏关闭按钮

可以通过设置 `closable` 属性来隐藏关闭按钮。

::: preview
demo-preview=../demo/Notification/Closeable.vue
:::

## 全局方法

通过全局方法 `$notify` 调用，可以弹出通知。

## 单独引用

```typescript
import { MxmNotification } from 'mxm-ui'

MxmNotification({
  title: 'title',
  message: 'This is a message',
})
```

## Notification API

### Notification 配置项

| 名称      | 说明             | 类型                                                     | 默认值 |
| --------- | ---------------- | -------------------------------------------------------- | ------ |
| title     | 标题             | `string`                                                 | -      |
| message   | 通知正文内容     | `string \| VNode`                                        | -      |
| type      | 通知的类型       | `enum` - `info \| success \| warning \| error \| danger` | info   |
| icon      | 自定义图标       | `string`                                                 | -      |
| duration  | 显示时间         | `number`                                                 | 3000   |
| showClose | 是否显示关闭按钮 | `boolean`                                                | true   |
| onClose   | 关闭时的回调函数 | `() => void`                                             | -      |
| onClick   | 点击时的回调函数 | `() => void`                                             | -      |
| offset    | 偏移             | `number`                                                 | 20     |

### Notification 方法

`Notification`会返回当前的 Notification 实例。 如果需要手动关闭实例，可以调用它的 close 方法。

| 名称  | 详情              | 类型         |
| ----- | ----------------- | ------------ |
| close | 关闭 Notification | `() => void` |
