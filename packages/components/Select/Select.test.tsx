import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Select from './Select.vue'
import Option from './Option.vue'
import { SELECT_CTX_KEY } from './constant'
import type { SelectOptionProps } from './types'

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

describe('Select', () => {
  test('render Select correctly with default props', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [{ value: '1', label: 'option 1' }],
      },
    })

    //在input上触发点击事件调出弹出层
    wrapper.find('input').trigger('click')

    await rAF()
    expect(wrapper.text()).toContain('option 1')
  })

  test('select an option', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [{ value: '1', label: 'option 1' }],
      },
    })

    wrapper.find('input').trigger('click')

    await rAF()
    const option = wrapper.findAll('li').at(0)

    await option?.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
  })

  test('Option emits an event on click', async () => {
    const ctx = {
      handleSelect: vi.fn(),
      selectStates: {
        selectedOption: null,
      },
      renderLabel: (props: SelectOptionProps) => `label: ${props.label}`,
    }
    const wrapper = mount(Option, {
      props: {
        value: '1',
        label: 'option 1',
      },
      global: {
        provide: {
          [SELECT_CTX_KEY as any]: ctx,
        },
      },
    })

    await wrapper.trigger('click')
    expect(ctx.handleSelect).toHaveBeenCalled()
  })
})
