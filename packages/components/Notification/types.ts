import type { ComponentInternalInstance, Ref, VNode } from 'vue'

export const notificationTypes = [
  'info',
  'success',
  'warning',
  'danger',
  'primary',
] as const
export type NotificationType = (typeof notificationTypes)[number]

export const notificationPositions = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
] as const
export type NotificationPosition = (typeof notificationPositions)[number]

export interface NotificationProps {
  title: string
  id: string
  zIndex: number
  position: NotificationPosition
  message?: string | VNode | (() => VNode)
  type?: NotificationType
  duration?: number
  showClose?: boolean
  offset?: number
  transitionName?: string
  icon?: string
  onClick?: () => void
  onClose?: () => void
  onDestroy: () => void
}

export type NotificationOptions = Partial<Omit<NotificationProps, 'id'>>
export type NotificationParams = string | VNode | NotificationOptions

export interface NotificationHandler {
  close: () => void
}

export interface NotificationInstance {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: NotificationProps
  handler: NotificationHandler
}

export interface NotificationCompInstance {
  close: () => void
  bottomOffset: Ref<number>
}

export type CreateNotificationProps = Omit<
  NotificationProps,
  'id' | 'zIndex' | 'onDestroy'
>

export type NotificationFn = {
  (props: NotificationParams): NotificationHandler
  closeAll: (type?: NotificationType) => void
}

export type NotificationTypeFn = (
  props: NotificationParams
) => NotificationHandler

export interface Notification extends NotificationFn {
  success: NotificationTypeFn
  warning: NotificationTypeFn
  info: NotificationTypeFn
  danger: NotificationTypeFn
}
