import { describe, it, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from './Button.vue'
import Icon from '../Icon/Icon.vue'
import ButtonGroup from './ButtonGroup.vue'

describe('Button.vue', () => {
  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      })
      expect(wrapper.classes()).toContain(`mxm-button--${type}`)
    })
  })

  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      })
      expect(wrapper.classes()).toContain(`mxm-button--${size}`)
    })
  })

  // Props: plain, round, circle
  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading'],
  ])(
    'should has the correct class when prop %s is set to true',
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ['ErIcon'],
        },
      })
      expect(wrapper.classes()).toContain(className)
    }
  )

  it('should has the correct native type attribute when native-type prop is set', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })

  // Props: tag
  it('should renders the custom tag when tag prop is set', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  // Events: click
  it('should emits a click event when the button is clicked', async () => {
    const wrapper = mount(Button, {})
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  // Exception Handling: loading state
  it('should display loading icon and not emit click event when button is loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      global: {
        stubs: ['MxmIcon'],
      },
    })
    const iconElement = wrapper.findComponent(Icon)

    expect(wrapper.find('.loading-icon').exists()).toBe(true)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  //Icon test
  it('should render icon correctly', () => {
    const wrapper = mount(Button, {
      props: { icon: 'search' },
      global: {
        stubs: ['MxmIcon'],
      },
    })
    const iconElement = wrapper.findComponent(Icon)

    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('search')
  })

  //throttle mode

  it('should emit click event immediately when useThrottle is false', async () => {
    const wrapper = mount(Button, {
      props: { useThrottle: false },
    })

    await wrapper.trigger('click')
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(2)
  })
  it('should throttle click events when useThrottle is true', async () => {
    const wrapper = mount(Button, {
      props: {
        useThrottle: true,
        throttleDuration: 500,
      },
    })

    vi.useFakeTimers()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    vi.advanceTimersByTime(500)
    vi.useRealTimers()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(2)
  })
})

test('loading button', () => {
  const wrapper = mount(Button, {
    props: {
      loading: true,
    },
    slots: {
      default: 'loading button',
    },
    global: {
      stubs: ['MxmIcon'],
    },
  })

  // class
  expect(wrapper.classes()).toContain('is-loading')

  // attrs
  expect(wrapper.attributes('disabled')).toBeDefined()
  expect(wrapper.find('button').element.disabled).toBeTruthy()

  // events
  wrapper.get('button').trigger('click')
  expect(wrapper.emitted()).not.toHaveProperty('click')

  // icon
  const iconElement = wrapper.findComponent(Icon)
  expect(iconElement.exists()).toBeTruthy()
  expect(iconElement.attributes('icon')).toBe('spinner')
})

describe('ButtonGroup.vue', () => {
  test('basic button group', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    expect(wrapper.classes()).toContain('mxm-button-group')
  })

  test('button group size', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`mxm-button--${size}`)
    })
  })

  test('button group type', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`mxm-button--${type}`)
    })
  })

  test('button group disabled', () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-disabled`)
  })
})
