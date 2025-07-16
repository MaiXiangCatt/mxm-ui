<template>
  <i
    class="mxm-icon"
    :class="[`mxm-icon--${props.type}`]"
    :style="customStyle"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'MxmIcon',
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
const filterProps = computed(() => {
  return omit(props, ['type', 'color'])
})

const customStyle = computed(() => {
  return { color: props.color ?? void 0 }
})
</script>

<style scoped>
@import './style.css';
</style>
