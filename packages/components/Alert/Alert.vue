<template>
  <transition name="mxm-alert-fade">
    <div class="mxm-alert"
         v-show="visible"
         role="alert"
         :class="{
          [`mxm-alert__${type}`]: type,
          [`mxm-alert__${effect}`]: effect
         }">
      <mxm-icon v-if="showIcon"
                class="mxm-alert__icon"
                :class="{ 'big-icon': withDescription}"
                :icon="iconName">
      </mxm-icon>
      <div class="mxm-alert__content">
        <span class="mxm-alert__title"
              :class="{'with-desc': withDescription}"
              :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
          <slot>{{ title }}</slot>
        </span>
        <p class="mxm-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="mxm-alert__close" v-if="closable">
          <mxm-icon icon="xmark" @click.stop="close"></mxm-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AlertProps, AlertEmits, AlertInstance } from './types';
import { typeIconMap } from '@mxm-ui/utils';
import MxmIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'MxmAlert'
})

const props = withDefaults(defineProps<AlertProps>(), {
  closable: true,
  effect: 'light',
  type: 'info'
})

const emits = defineEmits<AlertEmits>()

const slots = defineSlots()

const visible = ref(true)

function close() {
  visible.value = false
  emits('close')
}

function open() {
  visible.value = true
}

defineExpose<AlertInstance>({
  close,
  open
})

const iconName = computed(() => typeIconMap.get(props.type) || 'circle-info')
const withDescription = computed(() => props.description || slots.default)
</script>

<style scoped>
@import './style.css'
</style>