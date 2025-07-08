<template>
  <Transition
    :name="transitionName"
    @after-leave="!visible && onDestory()">
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
import type { MessageProps } from './types';
import { ref, onMounted, computed } from 'vue';
import { delay } from 'lodash-es';
import { typeIconMap, RenderVnode } from '@mxm-ui/utils';

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

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')

const cssStyle = computed(() => {
  return {
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

onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose({
  close
})
</script>

<style scoped>

</style>