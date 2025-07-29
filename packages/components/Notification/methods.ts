import { shallowReactive, isVNode, render, h } from 'vue'
import { each, findIndex, get, isString, set } from 'lodash-es'
import { useZindex, useId } from '@mxm-ui/hooks'
import { notificationTypes, notificationPositions } from './types'

import NotificationConstructor from './Notification.vue'

import type {
  CreateNotificationProps,
  NotificationInstance,
  NotificationProps,
  NotificationParams,
  NotificationHandler,
  NotificationFn,
  NotificationType,
  Notification,
} from './types'

// const instances: NotificationInstance[] = shallowReactive([])
export const instancesMap: Map<
  NotificationProps['position'],
  NotificationInstance[]
> = new Map()
each(notificationPositions, (position) => {
  instancesMap.set(position, shallowReactive([]))
})

const { nextZindex } = useZindex()

export const notificationDefaults = {
  type: 'info',
  duration: 4500,
  offset: 20,
  position: 'top-right',
  showClose: true,
  transitionName: 'fade',
} as const

export function getLastBottomOffset(this: NotificationProps) {
  /* c8 ignore next */
  const instances = instancesMap.get(this.position || 'top-right')!
  const idx = findIndex(instances, { id: this.id })
  console.log(idx)
  if (idx <= 0) return 0
  return get(instances, [idx - 1, 'vm', 'exposed', 'bottomOffset', 'value'])
}

const normalizeOptions = (
  options: NotificationParams
): CreateNotificationProps => {
  const result =
    !options || isVNode(options) || isString(options)
      ? { message: options }
      : options
  return { ...notificationDefaults, ...result } as CreateNotificationProps
}

const createNotification = (
  props: CreateNotificationProps
): NotificationInstance => {
  const id = useId().value
  const container = document.createElement('div')
  /* c8 ignore next */
  const instances = instancesMap.get(props.position || 'top-right')!

  const destroy = () => {
    const idx = findIndex(instances, { id })
    if (idx === -1) return

    instances.splice(idx, 1)
    render(null, container)
  }

  const _props: NotificationProps = {
    ...props,
    id,
    zIndex: nextZindex(),
    onDestroy: destroy,
  }

  const vnode = h(NotificationConstructor, _props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const handler: NotificationHandler = {
    close: () => vm.exposed!.close(),
  }

  const instance: NotificationInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  }

  instances.push(instance)
  return instance
}

export const notification: NotificationFn & Partial<Notification> = (
  options = {}
) => {
  const normalized = normalizeOptions(options)
  const instance = createNotification(normalized)

  return instance.handler
}

export function closeAll(type?: NotificationType) {
  instancesMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        if (instance.props.type === type) {
          instance.handler.close()
        }
      } else {
        instance.handler.close()
      }
    })
  })
}

notification.closeAll = closeAll

each(notificationTypes, (type) => {
  set(notification, type, (options: NotificationParams) => {
    const normalized = normalizeOptions(options)
    return notification({ ...normalized, type })
  })
})

export default notification as Notification
