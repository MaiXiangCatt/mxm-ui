import type { VNode, ComponentInternalInstance, Ref } from 'vue'

export const messageTypes = [
  'info',
  'success',
  'warning',
  'danger',
  'error',
  'primary',
] as const

export type MessageType = (typeof messageTypes)[number]

export interface MessageHandler {
  close: () => void
}

export interface MessageProps {
  id: string
  message?: string | VNode | (() => VNode)
  duration?: number
  showClose?: boolean
  center?: boolean
  type?: MessageType
  offset?: number
  zIndex: number
  transitionName?: string
  onDestroy: () => void
}

//MessageOptions是用户可以配置的选项，是提供给用户使用的（因为id是内部生成的，所以我们去掉）
//MessageParams定义调用Message函数时可以传入的参数类型，用于支持多种调用方式
export type MessageOptions = Partial<Omit<MessageProps, 'id'>>
export type MessageParams = string | VNode | MessageOptions

//MessageFn定义Message函数本身的类型，MessageTypeFn定义的是像Message.success这种方法的函数类型
export type MessageFn = {
  (props: MessageParams): MessageHandler
  closeAll: (type?: MessageType) => void
}

export type MessageTypeFn = (props: MessageParams) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypeFn
  warning: MessageTypeFn
  info: MessageTypeFn
  danger: MessageTypeFn
  error: MessageTypeFn
}

export interface MessageInstance {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  handler: MessageHandler
}

export interface MessageCompInstance {
  close: () => void
  bottomOffset: Ref<number>
}

//为什么CreateMessageProps要单独写一个：因为去掉的这几个属性是必选的，然而用户在调用时并不会传入这几个属性，它们是在createMessage时会加进去的。
export type CreateMessageProps = Omit<
  MessageProps,
  'onDestroy' | 'id' | 'zIndex'
>
