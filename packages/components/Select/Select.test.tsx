import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h, Fragment } from 'vue'

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

  test('should render initial value correctly', async () => {
    const options = [
      { value: '1', label: 'option 1' },
      { value: '2', label: 'option 2' },
      { value: '3', label: 'option 3' },
    ]

    const wrapper = mount(Select, {
      props: { options, modelValue: '2' },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('option 2')
  })

  test('should filter options when filterable is true', async () => {
    vi.useFakeTimers()
    const options = [
      { value: '1', label: 'option 1' },
      { value: '2', label: 'option 2' },
      { value: '3', label: 'option 3' },
    ]

    const wrapper = mount(Select, {
      props: { options, modelValue: '', filterable: true },
    })

    const input = wrapper.find('input')
    wrapper.trigger('click')
    input.setValue('2')

    vi.runAllTimers()
    await nextTick()

    const filteredOptions = wrapper.findAll('li')
    expect(filteredOptions.length).toBe(1)
    expect(filteredOptions[0].text()).toBe('option 2')

    input.setValue('test')
    vi.runAllTimers()
    await nextTick()
    expect(wrapper.find('.mxm-select__nodata').exists()).toBeTruthy()
    vi.useRealTimers()
  })

  test('should show loading and render optionos with remote filtering', async () => {
    vi.useFakeTimers()

    let resolveFn: (value: unknown) => void = () => {}
    const controlledPromise = new Promise((resolve) => {
      resolveFn = resolve
    })
    const remoteMethod = vi.fn().mockReturnValue(controlledPromise)

    const options = [
      { value: '1', label: 'test 1' },
      { value: '2', label: 'test 2' },
      { value: '3', label: 'option 3' },
      { value: '4', label: 'option 4' },
    ]
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        filterable: true,
        remote: true,
        remoteMethod,
        options,
      },
    })

    const input = wrapper.find('input')
    await wrapper.trigger('click')
    await input.setValue('option')

    vi.runAllTimers()
    await nextTick()
    expect(wrapper.find('.mxm-select__loading').exists()).toBeTruthy()

    resolveFn([
      { value: '3', label: 'option3' },
      { value: '4', label: 'option4' },
    ])

    vi.useRealTimers()
    await rAF()

    expect(wrapper.find('.mxm-select__loading').exists()).toBeFalsy()
    const filteredOptions = wrapper.findAll('li')
    expect(filteredOptions.length).toBe(2)
    expect(filteredOptions[0].text()).toBe('option3')
  })

  test('should update input value when modelValue changes externally', async () => {
    const options = [
      { value: '1', label: 'option1' },
      { value: '2', label: 'option2' },
    ]
    const wrapper = mount(Select, {
      props: {
        modelValue: '1',
        options,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('option1')

    await wrapper.setProps({ modelValue: '2' })
    await nextTick()
    expect(input.element.value).toBe('option2')
  })

  test('should update dropdown content when options prop changes', async () => {
    const initialOptions = [{ value: '1', label: 'option1' }]
    const updatedOptions = [
      { value: '2', label: 'option2' },
      { value: '3', label: 'option3' },
    ]

    const wrapper = mount(Select, {
      props: {
        modelValue: '1',
        options: initialOptions,
      },
    })

    await wrapper.trigger('click')
    await rAF()

    let renderedOptions = wrapper.findAll('li')
    expect(renderedOptions.length).toBe(initialOptions.length)
    expect(renderedOptions[0].text()).toBe(initialOptions[0].label)

    await wrapper.setProps({ options: updatedOptions })
    await nextTick()

    renderedOptions = wrapper.findAll('li')
    expect(renderedOptions.length).toBe(updatedOptions.length)
    expect(renderedOptions[0].text()).toBe(updatedOptions[0].label)
  })

  test('keyboard navigation should work correctly', async () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ]

    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await wrapper.trigger('click')
    await rAF()

    await input.trigger('keydown', { key: 'ArrowDown' })
    await rAF()

    let highlightedOption = wrapper.find('li.is-highlighted')
    expect(highlightedOption.exists()).toBeTruthy()
    expect(highlightedOption.text()).toBe('Option 1')

    await input.trigger('keydown', { key: 'ArrowDown' })
    await rAF()
    highlightedOption = wrapper.find('li.is-highlighted')
    expect(highlightedOption.exists()).toBeTruthy()
    expect(highlightedOption.text()).toBe('Option 2')

    await input.trigger('keydown', { key: 'ArrowUp' })
    await rAF()
    highlightedOption = wrapper.find('li.is-highlighted')
    expect(highlightedOption.exists()).toBeTruthy()
    expect(highlightedOption.text()).toBe('Option 1')

    await input.trigger('keydown', { key: 'ArrowUp' })
    await rAF()
    highlightedOption = wrapper.find('li.is-highlighted')
    expect(highlightedOption.exists()).toBeTruthy()
    expect(highlightedOption.text()).toBe('Option 3')

    await input.trigger('keydown', { key: 'Enter' })
    await rAF()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['3'])
    expect(input.element.value).toBe('Option 3')
    expect(wrapper.find('.mxm-select__menu').exists()).toBeFalsy()

    await input.trigger('keydown', { key: 'Enter' })
    await rAF()
    expect(wrapper.find('.mxm-select__menu').exists()).toBeTruthy()
    await input.trigger('keydown', { key: 'Enter' })
    await rAF()
    expect(wrapper.find('.mxm-select__menu').exists()).toBeFalsy()
  })

  test('keyboard navigation should do nothing when no options', async () => {
    const wrapper = mount(Select, { props: { options: [], modelValue: '' } })

    const input = wrapper.find('input')
    await wrapper.trigger('click')
    await rAF()

    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper.find('li.is-highlighted').exists()).toBeFalsy()
    await input.trigger('keydown', { key: 'ArrowUp' })
    await nextTick()
    expect(wrapper.find('li.is-highlighted').exists()).toBeFalsy()
  })

  test('should clear selected value when clear icon is clicked', async () => {
    const options = [
      { value: '1', label: 'option1' },
      { value: '2', label: 'option2' },
    ]

    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: '1',
        clearable: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('option1')

    await wrapper.trigger('mouseenter')
    await nextTick()
    const clearIcon = wrapper.find('.mxm-input__clear')
    expect(clearIcon.exists()).toBeTruthy()

    await clearIcon.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(input.element.value).toBe('')
  })

  test('should correctly call focus and blur methods', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '' },
      attachTo: document.body,
    })
    wrapper.vm.focus()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.find('input').element)
    wrapper.vm.blur()
    await nextTick()
    expect(document.activeElement).not.toBe(wrapper.find('input').element)
  })

  test('should revet input value to selected label when closing a filterable select', async () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ]

    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: '1',
        filterable: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Option 1')

    await wrapper.trigger('click')
    await input.setValue('test')
    await nextTick()
    expect(input.element.value).toBe('test')
    await input.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(input.element.value).toBe('Option 1')
  })

  test('should render custome label with renderLabel function', async () => {
    const options = [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
    ]

    const renderLabel = (option: SelectOptionProps) => {
      return h('b', { class: 'custom-label' }, option.label)
    }

    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: '',
        renderLabel,
      },
    })

    await wrapper.trigger('click')
    await rAF()

    const firstOptin = wrapper.find('li')
    const customLabel = firstOptin.find('b.custom-label')
    expect(customLabel.exists()).toBeTruthy()
    expect(customLabel.text()).toBe('Apple')
  })

  test('should handle remote method rejection and call debugwarn', async () => {
    vi.useFakeTimers()
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const rejectionError = new Error('Network Error')
    const remoteMethod = vi.fn().mockRejectedValue(rejectionError)

    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        filterable: true,
        remote: true,
        remoteMethod,
      },
    })
    const input = wrapper.find('input')
    await wrapper.trigger('click')
    await input.setValue('test')

    await vi.advanceTimersByTimeAsync(300)
    await nextTick()

    expect(wrapper.find('.mxm-select__loading').exists()).toBeFalsy()
    expect(warnSpy).toHaveBeenCalled()

    vi.useRealTimers()
    warnSpy.mockRestore()
  })
})

describe('Select with option children', async () => {
  test('should filter options correctly and handle keyboard navigation', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        filterable: true,
      },
      slots: {
        default: () => [
          <Option
            value="1"
            label="option1"
          ></Option>,
          <Option
            value="2"
            label="option2"
          ></Option>,
          <Option
            value="3"
            label="option3"
          ></Option>,
        ],
      },
    })

    await wrapper.trigger('click')

    const input = wrapper.find('input')
    await input.setValue('1')

    vi.runAllTimers()
    await nextTick()
    const options = wrapper.findAll('li')
    expect(options.length).toBe(1)
    expect(options[0].text()).toBe('option1')

    vi.useRealTimers()
  })

  test('should filter options with custom filter method', async () => {
    vi.useFakeTimers()
    const filterMethod = vi.fn((query) => {
      if (query) {
        return [{ value: '3', label: 'option3' }]
      }
      return []
    })
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        filterable: true,
        filterMethod,
      },
      slots: {
        default: () => [
          <Option
            value="1"
            label="option1"
          ></Option>,
          <Option
            value="2"
            label="option2"
          ></Option>,
          <Option
            value="3"
            label="option3"
          ></Option>,
        ],
      },
    })

    await wrapper.trigger('click')
    await wrapper.find('input').setValue('test')

    vi.runAllTimers()
    await nextTick()
    expect(filterMethod).toHaveBeenCalledWith('test')

    const options = wrapper.findAll('li')
    expect(options.length).toBe(1)
    expect(options[0].text()).toBe('option3')
    vi.useRealTimers()
  })

  test('should work with remote', async () => {
    vi.useFakeTimers()
    const remoteMethod = vi.fn().mockResolvedValue([])
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        filterable: true,
        remote: true,
        remoteMethod,
      },
      slots: {
        default: () => [
          <Option
            value="1"
            label="option1"
          ></Option>,
          <Option
            value="2"
            label="option2"
          ></Option>,
          <Option
            value="3"
            label="option3"
          ></Option>,
        ],
      },
    })

    await wrapper.trigger('click')
    await wrapper.find('input').setValue('test')

    vi.runAllTimers()
    await nextTick()

    expect(remoteMethod).toHaveBeenCalledWith('test')

    vi.useRealTimers()
  })

  test('should correctly handle options nested in a Fragment', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
      },
      slots: {
        default: () => [
          h(Option, { value: '1', label: 'Option 1' }),
          h(Fragment, [
            h(Option, { value: '2', label: 'Option 2' }),
            h(Option, { value: '3', label: 'Option 3' }),
          ]),
        ],
      },
    })

    await wrapper.trigger('click')
    await rAF()
    const options = wrapper.findAll('li')
    expect(options.length).toBe(3)
    expect(options[0].text()).toBe('Option 1')
  })
})
