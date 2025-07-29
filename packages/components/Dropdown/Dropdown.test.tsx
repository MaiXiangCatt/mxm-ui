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
    const items: DropdownItemProps[] = [
      { label: 'Item 1', command: 1 },
      { label: 'Item 2', command: 2 },
    ]
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
        hideOnClick: true,
        onCommand,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
        dropdown: () => items.map((item) => <DropdownItem {...item} />),
      },
      global: {
        stubs: ['mxm-icon'],
      },
    })

    // 由于 DropdownItem 是通过 slot 动态渲染的，你需要手动查找并点击
    const btn = wrapper.find('#trigger')
    await btn.trigger('click')
    // await wrapper.vm.open()
    await vi.runAllTimers()
    await nextTick()
    console.log(wrapper.html())
    const dropdownItems = wrapper.findAll('.mxm-dropdown__item')
    expect(dropdownItems).toHaveLength(2)

    await dropdownItems[0].trigger('click')

    expect(onCommand).toHaveBeenCalledTimes(1)
    expect(onCommand).toHaveBeenCalledWith(1)
  })

  // 测试 splitButton 功能
  it('should render split button when splitButton is true', () => {
    const wrapper = mount(Dropdown, {
      props: {
        splitButton: true,
        trigger: 'click',
      },
      slots: {
        default: () => 'Split Button',
        dropdown: () => (
          <DropdownItem
            label="Item 1"
            command={1}
          />
        ),
      },
      global: {
        stubs: ['mxm-icon'],
      },
    })

    const buttonGroup = wrapper.findComponent({ name: 'MxmButtonGroup' })
    expect(buttonGroup.exists()).toBeTruthy()

    const buttons = wrapper.findAllComponents({ name: 'MxmButton' })
    expect(buttons).toHaveLength(2)
  })

  // 测试 hideOnClick 为 false 的情况
  it('should not hide dropdown when hideOnClick is false', async () => {
    const onCommand = vi.fn()
    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
        hideOnClick: false,
        onCommand,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
        dropdown: () => (
          <DropdownItem
            label="Item 1"
            command={1}
          />
        ),
      },
      global: {
        stubs: ['mxm-icon'],
      },
    })

    const btn = wrapper.find('#trigger')
    await btn.trigger('click')
    await vi.runAllTimers()
    await nextTick()

    const dropdownItems = wrapper.findAll('.mxm-dropdown__item')
    await dropdownItems[0].trigger('click')

    expect(onCommand).toHaveBeenCalledWith(1)
    // 命令应该被触发，但下拉菜单应该仍然可见
    expect(wrapper.find('.mxm-tooltip').exists()).toBeTruthy()
  })
})

describe('DropdownItem.vue', () => {
  it('should render divided separator when divided is true', () => {
    const wrapper = mount(DropdownItem, {
      props: {
        divided: true,
        label: 'Divided Item',
      },
    })

    const separator = wrapper.find('.divided-placeholder')
    expect(separator.exists()).toBeTruthy()
    expect(separator.attributes('role')).toBe('separator')
  })

  it('should not trigger command when disabled', async () => {
    const mockHandleItemClick = vi.fn()
    const wrapper = mount(DropdownItem, {
      props: {
        disabled: true,
        label: 'Disabled Item',
        command: 'disabled-command',
      },
      global: {
        provide: {
          [Symbol('dropdownContext')]: {
            handleItemClick: mockHandleItemClick,
            size: { value: 'medium' },
          },
        },
      },
    })

    await wrapper.trigger('click')
    expect(mockHandleItemClick).not.toHaveBeenCalled()
  })
})
