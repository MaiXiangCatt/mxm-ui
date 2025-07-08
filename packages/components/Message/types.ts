import type { VNode, ComponentInternalInstance} from 'vue'

export const messageTypes = [
  "info",
  "success",
  "warning",
  "danger",
  "error"
] as const

export type MessageType = (typeof messageTypes)[number]

export interface MessageHandler {
  close: () => void;
}

export interface MessageProps {
  id: string;
  message?: string | VNode | (() => VNode);
  duration?: number;
  showClose?: boolean;
  center?: boolean;
  type?: MessageType;
  offset?: number;
  zIndex?: number;
  transitionName?: string;
  onDestroy: () => void;
}

export type MessageOptions = Partial<Omit<MessageProps, "id">>
export type MessageParams = string | VNode | MessageOptions

export type MessageFn = {
  (props: MessageParams): MessageHandler;
  closeAll: (type?: MessageType) => void;
}

export type MessageTypeFn = (props: MessageParams) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypeFn;
  warning: MessageTypeFn;
  info: MessageTypeFn;
  danger: MessageTypeFn;
  error: MessageTypeFn;
}

export interface MessageInstance {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  handler: MessageHandler
}

//为什么CreateMessageProps要单独写一个：因为去掉的这几个属性是必选的，然而用户在调用时并不会传入这几个属性，它们是在createMessage时会加进去的。
export type CreateMessageProps = Omit<MessageProps, "onDestroy" | "id" | "zIndex">