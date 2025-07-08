<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestroy()">
    <div
      ref="messageRef"
      class="mxm-message"
      :class="{
        [`mxm-message--${type}`]: type,
        'is-close:': showClose,
        'text-center': center
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      >
      <mxm-icon class="mxm-message__icon" :icon="iconName"></mxm-icon>
      <div class="mxm-message__content">
        <slot>
          <render-vnode v-if="message" :v-node="message"></render-vnode>
        </slot>
      </div>
      <div class="mxm-message__close">
        <mxm-icon icon="xmark" @click.stop="close"></mxm-icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from './types';
import { ref, onMounted, computed, watch } from 'vue';
import { delay, bind } from 'lodash-es';
import { typeIconMap, RenderVnode, addUnit } from '@mxm-ui/utils';
import { useOffset, useEventListener } from '@mxm-ui/hooks';
import { getLastBottomOffset } from './methods';

import MxmIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'MxmMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up'
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()

//计算盒子的高度
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
  offset: props.offset, 
  boxHeight: boxHeight,
  getLastBottomOffset: bind(getLastBottomOffset, props)
})

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')

const cssStyle = computed(() => {
  return {
    top: addUnit(topOffset.value),
    zIndex: props.zIndex}
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

watch(visible, (newVal) => {
  if(!newVal) {
    boxHeight.value = -props.offset
  }
})

//按下esc关闭
useEventListener(document, 'keydown', (e: Event) => {
  const {code} = e as KeyboardEvent
  if(code === 'Escape') {
    close()
  }
})

onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose<MessageCompInstance>({
  close,
  bottomOffset
})
</script>

<style scoped>
@import './style.css'
</style>