import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MxmDropdown, MxmDropdownItem } from '.'
import { mount } from '@vue/test-utils'
import type { DropdownItemProps } from './types'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { nextTick } from 'vue'

describe('Dropdown/index.ts', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(MxmDropdown.install).toBeDefined()
    expect(MxmDropdownItem.install).toBeDefined()
  })

  // 测试 Dropdown 组件是否被正确导出
  it('should be exported Dropdown component', () => {
    expect(MxmDropdown).toBe(Dropdown)
    expect(MxmDropdownItem).toBe(DropdownItem)
  })
})

describe('Dropdown.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('should render slots correctly', () => {
    const items: DropdownItemProps[] = [
      { label: 'Item 1', command: 1 },
      { label: 'Item 2', command: 2 },
    ]
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: () => <button id="trigger">Default slot content</button>,
        dropdown: () => items.map((item) => <DropdownItem {...item} />),
      },
    })

    expect(wrapper.text()).toContain('Default slot content')
    expect(wrapper.find('.mxm-dropdown').exists()).toBeTruthy()
  })

  it('should emit command and hide tooltip on item click', async () => {
    const onCommand = vi.fn()
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
        hideOnClick: true,
        onCommand,
        items: [{ label: 'Item 1', command: 'cmd1' }],
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
      },
      global: {
        stubs: ['mxm-icon'],
      },
    })

    // 由于 DropdownItem 是通过 slot 动态渲染的，你需要手动查找并点击
    const triggerBtn = wrapper.find('#trigger')
    await triggerBtn.trigger('click')
    await nextTick()
    console.log(wrapper.html())
    const item = wrapper.findComponent(DropdownItem)
    expect(item.exists()).toBe(true)

    await item.trigger('click')

    expect(onCommand).toHaveBeenCalledWith('cmd1')
  })
})
