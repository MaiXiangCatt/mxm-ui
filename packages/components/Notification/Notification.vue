<template>
  <Transition
    :name="`mxm-notification-${transitionName}`"
    @after-leave="!visible && onDestroy()"
    @enter="boxHeight = notificationRef.getBoundingClientRect().height">
    <div
      ref="notificationRef" 
      class="mxm-notification"
      :class="{
        [`mxm-notification--${type}`]: type,
        'is-close': showClose,
        [horizontalClass]: true
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      >
      <mxm-icon class="mxm-notification__icon" :icon="iconName!"></mxm-icon>
      <div class="mxm-notification__text">
        <div class="mxm-notification__title"> {{ title }} </div>
        <div class="mxm-notification__content">
          <slot>
            <render-vnode v-if="message" :v-node="message"></render-vnode>
          </slot>
        </div>
      </div>
      <div class="mxm-notification__close" v-if="showClose">
        <mxm-icon icon="xmark" @click.stop="close"></mxm-icon>
      </div>
    </div>
  </Transition>

</template>

<script setup lang="ts">
import { onMounted, ref, computed, Transition } from 'vue'
import { bind, delay, isString } from 'lodash-es';
import { typeIconMap, RenderVnode, addUnit } from '@mxm-ui/utils';
import { useOffset } from '@mxm-ui/hooks';
import { getLastBottomOffset } from './methods';
import type { NotificationProps, NotificationCompInstance } from './types';

import MxmIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'MxmNotification'
})

const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 4500,
  offset: 20,
  position: 'top-right',
  showClose: true,
  transitionName: 'fade'
})

const notificationRef = ref()
const visible = ref(false)
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
  offset: props.offset,
  boxHeight: boxHeight,
  getLastBottomOffset: bind(getLastBottomOffset, props)
})

const horizontalClass = computed(() => {
  if(props.position.endsWith('right')) {
    return 'right'
  } else {
    return 'left'
  }
})

const verticalProperty = computed(() => {
  if(props.position.startsWith('top')) {
    return 'top'
  } else {
    return 'bottom'
  }
})

const cssStyle = computed(() => ({
  [verticalProperty.value]: addUnit(topOffset.value),
  zIndex: props.zIndex
}))

const iconName = computed(() => {
  if(props.type !== 'info') {
    return typeIconMap.get(props.type)
  }
  if(isString(props.icon)) {
    return props.icon
  }
  return 'circle-info'
})

function close() {
  visible.value = false
}


let timer: number
function startTimer() {
  if(props.duration === 0) return;
  timer = delay(close, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}

onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose<NotificationCompInstance>({
  close,
  bottomOffset
})
</script>

<style scoped>
@import './style.css'
</style>