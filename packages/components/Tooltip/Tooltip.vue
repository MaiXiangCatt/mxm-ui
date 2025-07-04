<template>
   <div class="mxm-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="mxm-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="mxm-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { computed, ref, watch, watchEffect, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { bind, debounce } from 'lodash-es';
import type { DebouncedFunc } from 'lodash-es';
import { createPopper, type Instance } from '@popperjs/core';
import { useClickOutside } from '@mxm-ui/hooks';

defineOptions({
  name: 'MxmTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  showTimeout: 0,
  hideTimeout: 200
})

const emits = defineEmits<TooltipEmits>()

const visible = ref(false)

const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

const containerNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions
}))


const openDelay = computed(() => {
  return props.trigger === 'hover' ? props.showTimeout : 0
})

const closeDelay = computed(() => {
  return props.trigger === 'hover' ? props.hideTimeout : 0
})

let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

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
  if(props.disabled) return;
  visible.value = val
  emits('visible-change', val)
}

function attachEvenets() {
  if(props.disabled || props.manual) return;
  if(props.trigger === 'hover') {
    events.value["mouseenter"] = openFinal
    outerEvents.value["mouseleave"] = closeFinal
    dropdownEvents.value["mouseenter"] = openFinal
    return;
  }
  if(props.trigger === 'click') {
    events.value["click"] = togglePopper
    return;
  }
  if(props.trigger === 'contextmenu') {
    events.value["contextmenu"] = (e) => {
      e.preventDefault()
      openFinal()
    }
    return;
  }
}

let popperInstance: null | Instance

function destroyPopperInstance() {
  if(popperInstance) {
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

const show: TooltipInstance["show"] = openFinal
const hide: TooltipInstance["hide"] = function() {
  openDebounce?.cancel()
  setVisible(false)
}

watch(visible, (val) => {
  if(!val) return;
  if(triggerNode.value && popperNode.value) {
    popperInstance = createPopper(
      triggerNode.value,
      popperNode.value,
      popperOptions.value
    )
  }
},{
  flush: "post"
})

watch(() => props.manual, (isManual) => {
  if(isManual) {
    resetEvents()
    return;
  }
  attachEvenets()
})

watch(() => props.trigger, (val, oldVal) => {
  if(val === oldVal) return;
  openDebounce?.cancel()
  visible.value = false
  emits('visible-change', false)
  resetEvents()
})

watchEffect(() => {
  if(!props.manual) {
    attachEvenets()
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

useClickOutside(containerNode, () => {
  emits("click-outside")
  if(props.trigger === 'hover' || props.manual) return;
  
  visible.value && closeFinal()
})

onUnmounted(() => {
  destroyPopperInstance()
})

defineExpose<TooltipInstance>({
  show,
  hide
})
</script>

<style scoped>

</style>