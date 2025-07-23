<template>
  <div
    ref="containerNode"
    class="mxm-tooltip"
    v-on="outerEvents"
  >
    <div
      v-if="!virtualTriggering"
      ref="_triggerNode"
      class="mxm-tooltip__trigger"
      v-on="events"
    >
      <slot></slot>
    </div>
    <slot
      v-else
      name="default"
    ></slot>

    <transition
      :name="transition"
      @after-leave="destroyPopperInstance"
    >
      <div
        v-if="visible"
        ref="popperNode"
        class="mxm-tooltip__popper"
        v-on="dropdownEvents"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div
          id="arrow"
          data-popper-arrow
        ></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect, onUnmounted } from 'vue'
import { bind, debounce } from 'lodash-es'
import { createPopper, type Instance } from '@popperjs/core'
import { useClickOutside } from '@mxm-ui/hooks'
import { useEvenstToTiggerNode } from './useEventsToTriggerNode'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import type { ButtonInstance } from '../Button'
import type { DebouncedFunc } from 'lodash-es'
import type { Ref } from 'vue'

defineOptions({
  name: 'MxmTooltip',
})

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | ButtonInstance | void
  virtualTriggering?: boolean
}

const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  showTimeout: 0,
  hideTimeout: 200,
})

const emits = defineEmits<TooltipEmits>()

//控制展示层展示或隐藏
const visible = ref(false)

//这里是为了动态绑定事件，比如使用hover触发模式的时候，我们就要给触发区绑定mouseenter事件，而click模式则是click事件；
const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

const containerNode = ref<HTMLElement>()
const _triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

//虚拟触发节点的逻辑
const triggerNode = computed(() => {
  if (props.virtualTriggering) {
    return (
      ((props.virtualRef as ButtonInstance)?.ref as any) ??
      (props.virtualRef as HTMLElement) ??
      _triggerNode.value
    )
  }
  return _triggerNode.value as HTMLElement
})

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}))

const openDelay = computed(() => {
  return props.trigger === 'hover' ? props.showTimeout : 0
})

const closeDelay = computed(() => {
  return props.trigger === 'hover' ? props.hideTimeout : 0
})

let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

//我们希望鼠标落在触发区域的时候，不会执行close，落在区域外同理。所以要先取消掉closeDebounce或openDebounce
function openFinal() {
  closeDebounce?.cancel()
  openDebounce?.()
}

function closeFinal() {
  openDebounce?.cancel()
  closeDebounce?.()
}

function togglePopper() {
  visible.value ? closeFinal() : openFinal()
}

function setVisible(val: boolean) {
  if (props.disabled) return
  visible.value = val
  emits('visible-change', val)
}

function attachEvenets() {
  if (props.disabled || props.manual) return
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = openFinal
    outerEvents.value['mouseleave'] = closeFinal
    dropdownEvents.value['mouseenter'] = openFinal
    return
  }
  if (props.trigger === 'click') {
    events.value['click'] = togglePopper
    return
  }
  if (props.trigger === 'contextmenu') {
    events.value['contextmenu'] = (e) => {
      e.preventDefault()
      openFinal()
    }
    return
  }
}

let popperInstance: null | Instance

function destroyPopperInstance() {
  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }
}

function resetEvents() {
  events.value = {}
  outerEvents.value = {}
  dropdownEvents.value = {}

  attachEvenets()
}

const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = function () {
  openDebounce?.cancel()
  setVisible(false)
}

watch(
  visible,
  (newVal) => {
    if (!newVal) return
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      )
    }
  },
  {
    flush: 'post',
  }
)

//当是否手动模式manual值变化的时候，对绑定的事件进行处理
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      resetEvents()
      return
    }
    attachEvenets()
  }
)

watch(
  () => props.trigger,
  (val, oldVal) => {
    if (val === oldVal) return
    openDebounce?.cancel()
    visible.value = false
    emits('visible-change', false)
    resetEvents()
  }
)

watchEffect(() => {
  if (!props.manual) {
    attachEvenets()
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

//click模式下，点击容器外侧关闭tooltip的功能实现
useClickOutside(containerNode, () => {
  emits('click-outside')
  if (props.trigger === 'hover' || props.manual) return
  if (props.trigger === 'click' && visible.value && !props.manual) {
    closeFinal()
  }
})

useEvenstToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel()
  setVisible(false)
})

//卸载时清除popperInstance
onUnmounted(() => {
  destroyPopperInstance()
})

//暴露实例的show和hide方法
defineExpose<TooltipInstance>({
  show,
  hide,
})
</script>

<style scoped>
@import './style.css';
</style>
