---
title: Message
description: Message 组件文档

next:
  link: /components/messagebox
  text: MessageBox 消息弹出框

prev:
  link: /components/alert
  text: Alert 提示
---

# Message 消息提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基本用法

从顶部出现，3 秒后自动消失。Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。

::: preview
demo-preview=../demo/Message/Basic.vue
:::

我们注册了一个全局的`$message`方法用于调用。Message有插件式调用、函数式调用和全局方法调用三种调用方式。

::: preview
demo-preview=../demo/Message/Test.vue
:::

## 不同类型

用来显示「成功、警告、消息、错误」类的操作反馈。通过 `type` 属性来配置。

::: preview
demo-preview=../demo/Message/Type.vue
:::

## 可关闭的

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 showClose 设置为 true 此外，和 Notification 一样，Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。

::: preview
demo-preview=../demo/Message/Closeable.vue
:::

## 文字居中

通过 `center` 属性来配置文字是否居中。

::: preview
demo-preview=../demo/Message/Center.vue
:::

## 全局方法

Message 组件提供了全局方法 `$message`，在 Vue 实例中可以作为 `this.$message` 使用。

## 单独引用

```typescript
import { MxmMessage } from 'mxm-ui'

MxmMessage({
  message: 'This is a message',
})
```

此时调用方法为 MxmMessage(options)。 我们也为每个 type 定义了各自的方法，如 MxmMessage.success(options)。 并且可以调用 MxmMessage.closeAll() 手动关闭所有实例。

## Message API

### Message配置项

| 名称           | 说明                              | 类型                                                     | 默认值  |
| -------------- | --------------------------------- | -------------------------------------------------------- | ------- |
| message        | 消息文字                          | `string \| VNode`                                        | -       |
| type           | 主题类型                          | `enum` - `success \| warning \| error \| danger \| info` | info    |
| duration       | 显示时间，设置为 0 则不会自动关闭 | `number`                                                 | 3000    |
| showClose      | 是否显示关闭按钮                  | `boolean`                                                | false   |
| center         | 文字是否居中                      | `boolean`                                                | false   |
| offset         | Message 距离窗口顶部的偏移        | `number`                                                 | 10      |
| transitionName | 自定义 CSS 过渡动画名称           | `string`                                                 | fade-up |

### Message方法

调用 `Message` 或 `this.$message` 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 close 方法。

| 名称  | 描述         | 类型         |
| ----- | ------------ | ------------ |
| close | 关闭 Message | `() => void` |
