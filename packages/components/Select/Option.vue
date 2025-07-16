<template>
  <li
    :id="`select-item-${value}`"
    class="mxm-select__menu-item"
    :class="{
      'is-disabled': disabled,
      'is-selected': selected,
      'is-highlighted': isHighlighted,
    }"
    @click.stop="handleClick"
  >
    <slot>
      <render-vnode
        :v-node="ctx?.renderLabel ? ctx.renderLabel(props) : label"
      ></render-vnode>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { RenderVnode } from '@mxm-ui/utils'
import { inject, computed } from 'vue'
import { SELECT_CTX_KEY } from './constant'
import type { SelectOptionProps } from './types'

defineOptions({
  name: 'MxmOption',
})

const props = withDefaults(defineProps<SelectOptionProps>(), {
  disabled: false,
})
const ctx = inject(SELECT_CTX_KEY)

const selected = computed(
  () => ctx?.selectStates.selectedOption?.value === props.value
)
const isHighlighted = computed(() => {
  const highlightedOption = ctx?.highlightedLine?.value
  if (!highlightedOption) return false
  return (
    highlightedOption.label === props.label &&
    highlightedOption.value === props.value
  )
})

function handleClick() {
  if (props.disabled) return
  ctx?.handleSelect(props)
}
</script>

<style scoped></style>
