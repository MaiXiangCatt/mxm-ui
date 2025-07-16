<template>
  <li
    v-if="divided"
    role="separator"
    class="divided-placeholder"
  ></li>
  <li
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      'mxm-dropdown__item': true,
      ['mxm-dropdown__item--' + size]: size,
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot>
      <component
        :is="label"
        v-if="typeof label === 'object'"
      ></component>
      <template v-else> {{ label }} </template>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { DROPDOWN_CTX_KEY } from './constants'
import { computed, inject } from 'vue'
import { useId } from '@mxm-ui/hooks'
import type { DropdownItemProps } from './types'

defineOptions({
  name: 'MxmDropdownItem',
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  divided: false,
  command: useId().value,
})

const ctx = inject(DROPDOWN_CTX_KEY)
const size = computed(() => ctx?.size.value)

function handleClick() {
  if (!props.disabled) {
    ctx?.handleItemClick(props)
  }
}
</script>

<style scoped>
@import 'style.css';
</style>
