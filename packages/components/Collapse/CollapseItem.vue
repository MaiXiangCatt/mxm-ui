<template>
  <div
    class="mxm-collapse-item"
    :class="{ 'is-disabled': disabled }"
  >
    <div
      :id="`item-header-${name}`"
      class="mxm-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      @click="handleClick"
    >
      <span class="mxm-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <mxm-icon
        icon="angle-right"
        class="header-angle"
      />
    </div>
    <transition
      name="slide"
      v-on="transitionEvents"
    >
      <div
        v-show="isActive"
        class="mxm-collapse-item__wapper"
      >
        <div
          :id="`item-content-${name}`"
          class="mxm-collapse-item__content"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { inject, computed } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants'
import MxmIcon from '../Icon/Icon.vue'
import transitionEvents from './transitionEvents.'

defineOptions({
  name: 'MxmCollapseItem',
})
const props = defineProps<CollapseItemProps>()

const ctx = inject(COLLAPSE_CTX_KEY, void 0)
const isActive = computed(() => {
  return ctx?.activeNames.value?.includes(props.name)
})

function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props.name)
}
</script>

<style scoped>
@import './style.css';
</style>
