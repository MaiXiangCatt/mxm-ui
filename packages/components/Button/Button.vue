<template>
  <component
    :is="props.tag"
    ref="_ref"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled= "disabled || loading ? true : void 0"
    :autofocus="autofocus"
    class="mxm-button"
    :class="{
      [`mxm-button--${type}`]: type,
      [`mxm-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    @click="realBtnClickHandler">
  
  <template v-if="loading">
    <slot name="loading">
      <mxm-icon
        class="loading-icon"
        :icon="loadingIcon ?? 'spinner'"
        :style="iconStyle"
        size="1x"
        spin>
      </mxm-icon>
    </slot>
  </template>
  
  <mxm-icon v-if="icon && !loading" 
            :icon="icon" 
            size="1x"
            :style="iconStyle"></mxm-icon>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';
import { MxmIcon } from 'mxm-ui';

defineOptions({
  name: 'MxmButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})

const slots = defineSlots()

const emits = defineEmits<ButtonEmits>()

const btnClickHandler = (e: MouseEvent) => {
  emits("click", e)
  console.log(1)
}
const throttleBtnClick = throttle(btnClickHandler, props.throttleDuration)
const realBtnClickHandler = (e: MouseEvent) => {
  props.useThrottle ? throttleBtnClick(e) : btnClickHandler(e)
}

const _ref = ref<HTMLButtonElement>()
defineExpose<ButtonInstance>({
  ref: _ref
})

const iconStyle = computed(() => {
  return {marginRight: slots.default ? "6px": "0px"}
})
</script>

<style scoped>
@import './style.css';
</style>