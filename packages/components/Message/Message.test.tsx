import { describe, test, expect, vi } from "vitest";
import { nextTick } from "vue";
import { message, closeAll } from "./methods";

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  test('调用方法应该创建对应的Message组件', async () => {
    const handler = message({ message: 'test message', duration: 0})
    await rAF()
    expect(document.querySelector('.mxm-message')).toBeTruthy()
    handler.close()
    await rAF()
    expect(document.querySelector('.mxm-message')).toBeFalsy()
  })

  test('调用多次方法应该创建多个实例', async() => {
    message({ message: 'test message1', duration: 0})
    message({ message: 'test message2', duration: 0})
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(0)
  })

  test('创建多个实例应该设置正确的Offset', async() => {
    message({ message: 'test message1', duration: 0, offset: 20})
    message({ message: 'test message2', duration: 0, offset: 30})
    await rAF()
    const elements = document.querySelectorAll('.mxm-message')
    expect(elements.length).toBe(2)
    expect(getTopValue(elements[0])).toBe(20)
    expect(getTopValue(elements[1])).toBe(50)
  })

  test('按下ESC能够关闭所有Message', async() => {
    closeAll()
    message({ message: 'test message1', duration: 0})
    message({ message: 'test message2', duration: 0})
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(2)
    const event = new KeyboardEvent('keydown', { code: 'Escape'})
    document.dispatchEvent(event)
    await rAF()
    expect(document.querySelectorAll('.mxm-message').length).toBe(0)
  })

  test('duration不为0时能够定时关闭', async() => {
    vi.useFakeTimers()
    message( { message: 'test message', duration: 1000})
    await nextTick()
    expect(document.querySelector('.mxm-message')).toBeTruthy()

    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(document.querySelector('.mxm-message')?.className).toContain('fade-up-leave-active')
    vi.advanceTimersByTime(300)
    await nextTick()
    expect(document.querySelector('.mxm-message')).toBeFalsy()
    vi.useRealTimers()
  })
})