<template>
  <div
    class="mxm-dropdown"
    :class="{ 'is-disabled': props.disabled }"
  >
    <mxm-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <mxm-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <mxm-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </mxm-button>
        <mxm-button
          ref="triggerRef"
          icon="angle-down"
        ></mxm-button>
      </mxm-button-group>
      <slot
        v-else
        name="default"
      ></slot>
      <template #content>
        <div class="mxm-dropdown__menu">
          <slot name="dropdown">
            <template
              v-for="item in items"
              :key="item.command"
            >
              <mxm-dropdown-item v-bind="item"></mxm-dropdown-item>
            </template>
          </slot>
        </div>
      </template>
    </mxm-tooltip>
  </div>
</template>

<script setup lang="ts">
import MxmTooltip from '../Tooltip/Tooltip.vue'
import MxmDropdownItem from './DropdownItem.vue'
import { MxmButtonGroup, MxmButton } from '../Button'
import { ref, computed, provide } from 'vue'
import { omit, isNil } from 'lodash-es'
import { useDisabledStyle } from '@mxm-ui/hooks'
import { DROPDOWN_CTX_KEY } from './constants'
import type { TooltipInstance } from '../Tooltip/types'
import type { ButtonInstance } from '../Button/types'
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  DropdownContext,
  DropdownItemProps,
} from './types'

defineOptions({
  name: 'MxmDropdown',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
})

const emits = defineEmits<DropdownEmits>()
const slots = defineSlots()

const tooltipRef = ref<TooltipInstance>()
const triggerRef = ref<ButtonInstance>()

const tooltipProps = computed(() => {
  return omit(props, ['type', 'size', 'items', 'hideOnclick', 'splitButton'])
})

function handleItemClick(e: DropdownItemProps) {
  if (props.hideOnClick) {
    tooltipRef.value?.hide()
  }
  if (!isNil(e.command)) {
    emits('command', e.command)
  }
}

useDisabledStyle()

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
})

defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
})
</script>

<style scoped>
@import './style.css';

:deep(.mxm-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
