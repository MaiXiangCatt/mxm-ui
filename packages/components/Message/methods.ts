import { h, isVNode, render, shallowReactive } from "vue";
import type { 
  CreateMessageProps,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessageHandler,
  MessageType,
  MessageProps} from "./types";
import { messageTypes } from "./types";
import { useId } from "@mxm-ui/hooks";
import { each, findIndex, isString, set } from "lodash-es";
import MessageConstructor from "./Message.vue";


const instances: MessageInstance[] = shallowReactive([])

export const messageDefaults = {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up'
}

const normalizeOptions = (options: MessageParams): CreateMessageProps => {
  const result = !options || isVNode(options) || isString(options) ? { message: options} : options
  return {...messageDefaults, ...result} as CreateMessageProps
}

const createMessage = (props: CreateMessageProps): MessageInstance => {
  const id = useId().value
  const container = document.createElement('div')

  const destroy = () => {
    const idx = findIndex(instances, {id})
    if(idx === -1) return;

    instances.splice(idx, 1)
    render(null, container)
  }

  const _props: MessageProps = {
    ...props,
    id,
    zIndex: 200,
    onDestroy: destroy
  }

  const vnode = h(MessageConstructor, _props)

  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const handler: MessageHandler = {
    close: () => vm.exposed!.close()
  }

  const instance: MessageInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler
  }

  instances.push(instance)
  return instance
}

export const message: MessageFn & Partial<Message> = (options = {}) => {
  const normalized = normalizeOptions(options)
  const instance = createMessage(normalized)

  return instance.handler
}

export function closeAll(type?: MessageType) {
  each(instances, (instance) => {
    if(type) {
      if(instance.props.type === type) {
        instance.handler.close()
      }
    }
    instance.handler.close()
  })
}

each(messageTypes, (type) => {
  set(message, type, (options: MessageParams) => {
    const normalized = normalizeOptions(options)
    return message({...normalized, type})
  })
})

message.closeAll = closeAll

export default message as Message