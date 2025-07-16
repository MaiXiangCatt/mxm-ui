import { describe, expect, it, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { each, get } from 'lodash-es'
import Popconfirm from './Popconfirm.vue'
import { MxmPopconfirm } from './index'
import type { PopconfirmProps } from './types'

const onConfirm = vi.fn()
const onCancel = vi.fn()

describe('Popconfirm/index.ts', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(MxmPopconfirm.install).toBeDefined()
  })

  // 测试 Popconfirm 组件是否被正确导出
  it('should be exported Popconfirm component', () => {
    expect(MxmPopconfirm).toBe(Popconfirm)
  })
})

describe('Popconfirm.vue', () => {
  const props = {
    title: 'Test Title',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonType: 'primary',
    cancelButtonType: 'info',
    icon: 'check-circle',
    iconColor: 'green',
    hideIcon: false,
    hideAfter: 500,
    width: 200,
  } as PopconfirmProps
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('should accept all props', () => {
    const wrapper = mount(Popconfirm, {
      props: props,
    })

    each(props, (value, key) => {
      expect(get(wrapper.props(), key)).toBe(value)
    })
  })

  it('should render slot content correctly', () => {
    const slotContent = 'Slot Content'
    const wrapper = mount(Popconfirm, {
      props: props,
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })

  test('popconfirm emits', async () => {
    const wrapper = mount(() => (
      <div>
        <div id="outside"></div>
        <Popconfirm
          title="Test Title"
          hideIcon={true}
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          <button id="trigger">trigger</button>
        </Popconfirm>
      </div>
    ))

    const triggerNode = wrapper.find('#trigger')
    expect(triggerNode.exists()).toBeTruthy()

    triggerNode.trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.mxm-popconfirm').exists()).toBeTruthy()
    const confirmBtn = wrapper.find('.mxm-popconfirm__confirm')
    expect(confirmBtn.exists()).toBeTruthy()

    confirmBtn.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-popconfirm').exists()).toBeFalsy()
    expect(onConfirm).toBeCalled()

    triggerNode.trigger('click')
    await vi.runAllTimers()

    expect(wrapper.find('.mxm-popconfirm').exists()).toBeTruthy()
    const cancelBtn = wrapper.find('.mxm-popconfirm__cancel')
    expect(cancelBtn.exists()).toBeTruthy()

    cancelBtn.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.mxm-popconfirm').exists()).toBeFalsy()
    expect(onCancel).toBeCalled()
  })
})
