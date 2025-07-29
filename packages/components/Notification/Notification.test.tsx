import { describe, test, expect, vi } from 'vitest'
import { nextTick, h } from 'vue'
import { notification, instancesMap } from './methods'

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}
function getBottomValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const bottomValue = styles.getPropertyValue('bottom')
  return Number.parseFloat(bottomValue)
}

describe('createNotification', () => {
  test('call notification()', async () => {
    const handler = notification({ title: 'hello msg', duration: 0 })
    await rAF()
    expect(document.querySelector('.mxm-notification')).toBeTruthy()
    handler.close()
    await rAF()
    expect(document.querySelector('.mxm-notification')).toBeFalsy()
  })

  test('call notification() more times', async () => {
    notification({ title: 'hello msg', duration: 0 })
    notification({ title: 'hello msg', duration: 0 })
    await rAF()
    expect(document.querySelectorAll('.mxm-notification').length).toBe(2)
    notification.closeAll()
    await rAF()
    expect(document.querySelectorAll('.mxm-notification').length).toBe(0)
  })

  test('offset', async () => {
    notification({ title: 'hello msg', duration: 0, offset: 100 })
    notification({ title: 'hello msg', duration: 0, offset: 50 })
    await rAF()
    const elements = document.querySelectorAll('.mxm-notification')
    expect(elements.length).toBe(2)

    expect(getTopValue(elements[0])).toBe(100)
    expect(getTopValue(elements[1])).toBe(150)

    notification.closeAll()
    await rAF()
  })

  test('should compute correct horizontal and vertical classes', async () => {
    notification({
      title: 'bottom-left test',
      duration: 0,
      position: 'bottom-left',
    })
    await rAF()
    const notificationEl = document.querySelector('.mxm-notification')
    expect(notificationEl).toBeTruthy()

    expect(notificationEl?.classList.contains('mxm-notification')).toBe(true)
    expect(notificationEl?.classList.contains('left')).toBe(true)

    expect(getBottomValue(notificationEl!)).toBe(20)

    notification.closeAll()
    await rAF()
  })

  test('should compute correct icon name when type is not info', async () => {
    notification({
      type: 'success',
      title: 'Success test',
      message: 'This is a success notification',
    })
    await rAF()
    const iconSvgElement = document.querySelector('.mxm-notification__icon svg')
    expect(iconSvgElement).toBeTruthy()
    expect(iconSvgElement?.getAttribute('data-icon')).toBe('circle-check')

    notification.closeAll()
    await rAF()
  })

  test('should compute correct custom icon name', async () => {
    notification({
      title: 'test',
      icon: 'circle-user',
    })
    await rAF()
    const iconSvgElement = document.querySelector('.mxm-notification__icon svg')
    expect(iconSvgElement).toBeTruthy()
    expect(iconSvgElement?.getAttribute('data-icon')).toBe('circle-user')

    notification.closeAll()
    await rAF()
  })

  test('should clear timer when mouseenter and restart timer when mouseleave', async () => {
    vi.useFakeTimers()
    notification({
      title: 'test',
      duration: 5000,
    })
    await nextTick()
    const notificationEl = document.querySelector('.mxm-notification')
    expect(notificationEl).toBeTruthy()

    const enterEvent = new MouseEvent('mouseenter')
    notificationEl!.dispatchEvent(enterEvent)
    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(document.querySelector('.mxm-notification')).toBeTruthy()

    const leaveEvent = new MouseEvent('mouseleave')
    notificationEl!.dispatchEvent(leaveEvent)
    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(document.querySelector('.mxm-notification')?.className).toContain(
      'mxm-notification-fade-leave-active'
    )
    vi.advanceTimersByTime(300)
    await nextTick()
    expect(document.querySelector('.mxm-notification')).toBeFalsy()

    vi.useRealTimers()
  })

  test('should render and close correct type', async () => {
    notification.success!({ title: 'success', duration: 0 })
    notification.danger!({ title: 'error', duration: 0 })
    await rAF()

    expect(document.querySelectorAll('.mxm-notification').length).toBe(2)
    expect(document.querySelector('.mxm-notification--success')).toBeTruthy()

    notification.closeAll('success')
    await rAF()
    expect(document.querySelectorAll('.mxm-notification').length).toBe(1)

    notification.closeAll()
    await rAF()
  })

  test('should render vnode content correctly', async () => {
    const vnode = h('b', 'vnode message')
    notification(vnode)
    await rAF()

    const vnodeEl = document.querySelector('.mxm-notification__content b')
    expect(vnodeEl).toBeTruthy()
    expect(vnodeEl!.textContent).toBe('vnode message')
    notification.closeAll()
    await rAF()
  })

  test('should not thrrow error if instance is removed before destroy is called', async () => {
    const handler = notification({
      title: 'test',
      duration: 0,
    })
    await rAF()

    const instances = instancesMap.get('top-right')
    expect(instances?.length).toBe(1)

    instances?.splice(0, 1)
    handler.close()
    await rAF()
    expect(instances?.length).toBe(0)
  })
})
