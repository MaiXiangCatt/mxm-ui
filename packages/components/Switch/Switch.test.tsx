import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from './Switch.vue'

describe('Switch.vue', () => {
  it('should render Switch correctly', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('.mxm-switch').exists()).toBeTruthy()
  })

  it('should handle click event and toggle the checked state', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
    expect(wrapper.emitted()['change'][0]).toEqual([true])

    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false])
    expect(wrapper.emitted()['change'][1]).toEqual([false])
  })

  it('should not toggle when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).not.toHaveProperty('change')
  })

  it('should change innerValue when modelValue changed', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.vm.checked).toBe(true)
  })

  it('should render active and inactive text', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeText: 'ON',
        inactiveText: 'OFF',
      },
    })

    expect(wrapper.find('.mxm-switch__core-inner-text').text()).toBe('ON')

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('.mxm-switch__core-inner-text').text()).toBe('OFF')
  })

  it('should support custom active and inactive values', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: 'off',
        activeValue: 'on',
        inactiveValue: 'off',
      },
    })

    expect(wrapper.vm.checked).toBe(false)

    await wrapper.trigger('click')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['on'])
    expect(wrapper.emitted()['change'][0]).toEqual(['on'])
  })

  it('should handle enter keydown event', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
    expect(wrapper.emitted()['change'][0]).toEqual([true])
  })

  it('should expose focus method and checked property', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.vm.checked).toBe(false)
    expect(typeof wrapper.vm.focus).toBe('function')

    const focusSpy = vi.spyOn(wrapper.find('input').element, 'focus')
    wrapper.vm.focus()
    expect(focusSpy).toHaveBeenCalled()
  })

  it('should support different sizes', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        size: 'small',
      },
    })

    expect(wrapper.find('.mxm-switch--small').exists()).toBeTruthy()

    const wrapper2 = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper2.find('.mxm-switch--small').exists()).toBeFalsy()
  })
})
