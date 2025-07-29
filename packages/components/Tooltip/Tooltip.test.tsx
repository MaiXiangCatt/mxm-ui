import { describe, test, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { MxmTooltip } from './index'
import { createPopper } from '@popperjs/core'
import { nextTick } from 'vue'

import Tooltip from './Tooltip.vue'

const destroyMock = vi.fn()
vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: destroyMock,
  })),
}))

const onVisibleChange = vi.fn()

describe('Tooltip/index.ts', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(MxmTooltip.install).toBeDefined()
  })

  // 测试 Tooltip 组件是否被正确导出
  it('should be exported Tooltip component', () => {
    expect(MxmTooltip).toBe(Tooltip)
  })
})

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip
            content="hello tooltip"
            trigger="click"
            {...{ onVisibleChange }}
          >
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body,
      }
    )
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()

    // 弹出层是否出现
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.mxm-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // 再次点击
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledTimes(2)

    // 等待动画
    await vi.runAllTimers()

    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    // 区域外点击关闭 tooltip
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledTimes(4)

    // 注销流程
    wrapper.unmount()
  })

  test('tooltip with hover trigger', async () => {
    // ... 省略其他设置
    const wrapper = mount(Tooltip, {
      props: { trigger: 'hover', content: 'test' },
    })
    // 测试悬停显示
    wrapper.find('.mxm-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    // 测试悬外隐藏
    wrapper.find('.mxm-tooltip').trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.er-tooltip__popper').exists()).toBeFalsy()
  })

  // 右键菜单触发的测试
  test('tooltip with contextmenu trigger', async () => {
    // ... 省略其他设置
    const wrapper = mount(Tooltip, {
      props: { trigger: 'contextmenu', content: 'test' },
    })
    // 测试右键菜单显示
    wrapper.find('.mxm-tooltip__trigger').trigger('contextmenu')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    // 测试右键菜单隐藏（可以模拟点击外部区域）
  })

  // 手动模式的测试
  test('tooltip with manual trigger', async () => {
    // ... 省略其他设置
    const wrapper = mount(Tooltip, {
      props: { manual: true, content: 'test' },
    })
    // 测试手动触发显示和隐藏
    wrapper.vm.show() // 假设 show 方法可以通过某种方式访问
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    wrapper.vm.hide()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()
  })

  // 禁用状态的测试
  test('disabled tooltip', async () => {
    // ... 省略其他设置
    const onVisibleChange = vi.fn()
    const wrapper = mount(Tooltip, {
      props: {
        disabled: true,
        content: 'test',
        trigger: 'click',
        onVisibleChange,
      },
    })
    // 测试禁用状态下点击不会触发显示
    wrapper.find('.mxm-tooltip__trigger').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()

    wrapper.vm.show()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).not.toHaveBeenCalled()
  })

  //虚拟触发节点的测试
  test('tooltip with virtual trigger node', async () => {
    // ... 省略其他设置
    const virtualRef = document.createElement('div')
    const wrapper = mount(Tooltip, {
      props: { virtualRef, virtualTriggering: true },
    })
    // 测试虚拟节点的事件触发
    virtualRef.dispatchEvent(new Event('mouseenter'))
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
  })

  // 测试 trigger 属性变化
  test('tooltip trigger change', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'test', trigger: 'click' },
    })

    // 初始为 click 模式
    wrapper.find('.mxm-tooltip__trigger').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()

    // 切换到 hover 模式
    await wrapper.setProps({ trigger: 'hover' })
    wrapper.vm.hide()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()

    // 现在应该可以通过 hover 触发
    wrapper.find('.mxm-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
  })

  // 测试 show 和 hide 方法
  test('tooltip show and hide methods', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'test' },
    })

    // 调用 show 方法
    wrapper.vm.show()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()

    // 调用 hide 方法
    wrapper.vm.hide()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()
  })

  // 测试 manual 属性切换
  test('manual property switching', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'test', manual: true, trigger: 'click' },
    })
    // manual 模式下事件不应该触发显示
    wrapper.find('.mxm-tooltip__trigger').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()

    // 但可以通过 show 方法显示
    wrapper.vm.show()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    wrapper.vm.hide()

    // 切换manual为false
    await wrapper.setProps({ manual: false })

    wrapper.find('.mxm-tooltip__trigger').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    wrapper.vm.hide()
    await vi.runAllTimers()

    await wrapper.setProps({ manual: true })
    wrapper.find('.mxm-tooltip__trigger').trigger('click')
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeFalsy()
  })

  // 测试组件卸载时 destroyPopperInstance 被调用
  test('should call popperInstance.destroy when unmounted', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'test' },
    })

    // 显示 tooltip 以创建 popper 实例
    wrapper.vm.show()
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    expect(createPopper).toHaveBeenCalled()
    // 卸载组件
    wrapper.unmount()
    expect(destroyMock).toHaveBeenCalled()
  })

  // 测试虚拟触发节点事件变化
  test('virtual trigger node event changes', async () => {
    const virtualRef = document.createElement('div')
    const wrapper = mount(Tooltip, {
      props: {
        virtualRef,
        virtualTriggering: true,
        trigger: 'click',
        content: 'test',
      },
    })

    // 更改 trigger 属性
    await wrapper.setProps({ trigger: 'hover' })

    // 测试 hover 事件
    virtualRef.dispatchEvent(new Event('mouseenter'))
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
  })

  test('should not close on outside click when trigger is hover', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip
            content="test"
            trigger="hover"
          >
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      { attachTo: document.body }
    )
    await wrapper.find('.mxm-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()

    await wrapper.find('#outside').trigger('click)')
    await vi.runAllTimers()

    expect(wrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    wrapper.unmount()
  })

  test('should not close on outside when in manual mode', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip
            content="test"
            trigger="hover"
          >
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      { attachTo: document.body }
    )
    const tooltipWrapper = wrapper.findComponent(Tooltip)
    tooltipWrapper.vm.show()
    await vi.runAllTimers()
    expect(tooltipWrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()

    await wrapper.find('#outside').trigger('click')
    await vi.runAllTimers()
    expect(tooltipWrapper.find('.mxm-tooltip__popper').exists()).toBeTruthy()
    wrapper.unmount()
  })

  test('should re-bind events when trigger prop changes in virtual mode', async () => {
    const virtualRef = document.createElement('div')
    const addListenerSpy = vi.spyOn(virtualRef, 'addEventListener')
    const removeListenerSpy = vi.spyOn(virtualRef, 'removeEventListener')

    const wrapper = mount(Tooltip, {
      props: {
        trigger: 'click',
        virtualTriggering: true,
        virtualRef: virtualRef,
        content: 'test',
      },
    })
    expect(addListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))

    await wrapper.setProps({ trigger: 'hover' })
    await vi.runAllTimers()
    await nextTick()
    expect(removeListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function)
    )
  })
})
