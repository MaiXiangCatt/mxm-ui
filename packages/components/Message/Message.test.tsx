import { describe, test, expect, vi } from 'vitest'
import { nextTick, h } from 'vue'
import { message, closeAll, instances } from './methods'
import type { MessageType } from './types'

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

describe('createMessage', () => {
  test('调用方法应该创建对应的Message组件', async () => {
    const handler = message({ message: 'test message', duration: 0 })
    await rAF()
    expect(document.querySelector('.mxm-message')).toBeTruthy()
    handler.close()
    await rAF()
    expect(document.querySelector('.mxm-message')).toBeFalsy()
  })

  test('调用多次方法应该创建多个实例', async () => {
    message({ message: 'test message1', duration: 0 })
    message({ message: 'test message2', duration: 0 })
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(0)
  })

  test('创建多个实例应该设置正确的Offset', async () => {
    message({ message: 'test message1', duration: 0, offset: 20 })
    message({ message: 'test message2', duration: 0, offset: 30 })
    await rAF()
    const elements = document.querySelectorAll('.mxm-message')
    expect(elements.length).toBe(2)
    expect(getTopValue(elements[0])).toBe(20)
    expect(getTopValue(elements[1])).toBe(50)
  })

  test('按下ESC能够关闭所有Message', async () => {
    closeAll()
    message({ message: 'test message1', duration: 0 })
    message({ message: 'test message2', duration: 0 })
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(2)
    const event = new KeyboardEvent('keydown', { code: 'Escape' })
    document.dispatchEvent(event)
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(0)
  })

  test('鼠标移入时应该清除定时器，移出时重新计时', async () => {
    vi.useFakeTimers()
    message({ message: 'hover test', duration: 2000 })
    await nextTick()
    const messageEl = document.querySelector('.mxm-message')
    expect(messageEl).toBeTruthy()

    const enterEvent = new MouseEvent('mouseenter')
    messageEl!.dispatchEvent(enterEvent)
    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(document.querySelector('.mxm-message')).toBeTruthy()

    const leaveEvent = new MouseEvent('mouseleave')
    messageEl!.dispatchEvent(leaveEvent)
    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(document.querySelector('.mxm-message')?.className).toContain(
      'fade-up-leave-active'
    )
    vi.advanceTimersByTime(300)
    await nextTick()
    expect(document.querySelector('.mxm-message')).toBeFalsy()

    vi.useRealTimers()
  })

  test('closeAll 能正确关闭某个type的Message', async () => {
    message.success!({ message: 'success test1', duration: 0 })
    message.error!({ message: 'error test', duration: 0 })
    await rAF()

    expect(document.querySelectorAll('.mxm-message').length).toBe(2)

    closeAll('success')
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(1)
  })

  test('should render vnode message', async () => {
    const vnode = h('span', 'vnode message')
    message(vnode)
    await rAF()
    expect(document.querySelector('.mxm-message')).toBeTruthy()

    const vNodeEl = document.querySelector('.mxm-message__content span')
    expect(vNodeEl).toBeTruthy()
    expect(vNodeEl!.textContent).toBe('vnode message')
    closeAll()
    await rAF()
  })

  test('should show close button when showClose is true', async () => {
    message({ message: 'test message', duration: 0, showClose: true })
    await rAF()
    expect(document.querySelector('.mxm-message__close')).toBeTruthy()
    closeAll()
    await rAF()
  })

  test('should support different message types', async () => {
    message.success!({ message: 'success message', duration: 0 })
    await rAF()
    const element = document.querySelector('.mxm-message')
    expect(element).toBeTruthy()
    expect(element?.className).toContain('mxm-message--success')
    closeAll()
    await rAF()
  })

  test('should support center alignment', async () => {
    message({ message: 'center message', duration: 0, center: true })
    await rAF()
    const element = document.querySelector('.mxm-message')
    expect(element).toBeTruthy()
    expect(element?.className).toContain('text-center')
    closeAll()
    await rAF()
  })

  test('should handle message with no options', async () => {
    // @ts-expect-error - Testing invalid input
    message()
    await rAF()
    expect(document.querySelector('.mxm-message')).toBeTruthy()
    closeAll()
    await rAF()
  })

  test('should use fallback icon for invalid type', async () => {
    message({
      message: 'Invalid type',
      duration: 0,
      type: 'invalid' as MessageType,
    })
    await rAF()

    const iconSvgElement = document.querySelector('.mxm-message__icon svg')
    expect(iconSvgElement).toBeTruthy()
    expect(iconSvgElement?.getAttribute('data-icon')).toBe('circle-info')

    closeAll()
    await rAF()
  })

  test('should not throw error if instance is already removed before close', async () => {
    const messageHandler = message({
      message: 'test',
      duration: 0,
    })
    await rAF()
    expect(instances.length).toBe(1)

    instances.splice(0, 1)
    messageHandler.close()
    await rAF()
    expect(instances.length).toBe(0)
  })
})
