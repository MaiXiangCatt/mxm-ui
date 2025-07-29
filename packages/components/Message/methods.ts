import { h, isVNode, render, shallowReactive } from 'vue'
import type {
  CreateMessageProps,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessageHandler,
  MessageType,
  MessageProps,
} from './types'
import { messageTypes } from './types'
import { useId, useZindex } from '@mxm-ui/hooks'
import { each, findIndex, isString, set, get } from 'lodash-es'
import MessageConstructor from './Message.vue'

export const instances: MessageInstance[] = shallowReactive([])

export const messageDefaults = {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up',
}

const { nextZindex } = useZindex()

const normalizeOptions = (options: MessageParams): CreateMessageProps => {
  const result =
    !options || isVNode(options) || isString(options)
      ? { message: options }
      : options
  return { ...messageDefaults, ...result } as CreateMessageProps
}

const createMessage = (props: CreateMessageProps): MessageInstance => {
  const id = useId().value
  const container = document.createElement('div')

  const destroy = () => {
    const idx = findIndex(instances, { id })
    if (idx === -1) return

    instances.splice(idx, 1)
    render(null, container)
  }

  const _props: MessageProps = {
    ...props,
    id,
    zIndex: nextZindex(),
    onDestroy: destroy,
  }

  const vnode = h(MessageConstructor, _props)

  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)

  //vm其实就是组件实例，当一个vnode被渲染成一个真实的组件后，Vue会将该组件的实例挂载到 vnode 的 component property上。获取组件实例之后，我们就可以通过vm.exposed访问到组件通过defineExpose暴露出的内容，包括close的方法等等
  const vm = vnode.component!
  const handler: MessageHandler = {
    close: () => vm.exposed!.close(),
  }

  const instance: MessageInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  }

  instances.push(instance)
  return instance
}

export const message: MessageFn & Partial<Message> = (options = {}) => {
  const normalized = normalizeOptions(options)
  const instance = createMessage(normalized)

  return instance.handler
}

export function getLastBottomOffset(this: MessageProps) {
  const idx = findIndex(instances, { id: this.id })
  if (idx <= 0) return 0
  return get(instances, [idx - 1, 'vm', 'exposed', 'bottomOffset', 'value'])
}

export function closeAll(type?: MessageType) {
  each(instances, (instance) => {
    if (type) {
      if (instance.props.type === type) {
        instance.handler.close()
      }
    } else {
      instance.handler.close()
    }
  })
}

//给message对象添加message.success等快捷方法
each(messageTypes, (type) => {
  set(message, type, (options: MessageParams) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type })
  })
})

message.closeAll = closeAll

export default message as Message
