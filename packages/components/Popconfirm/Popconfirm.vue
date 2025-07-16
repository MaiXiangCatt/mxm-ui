<template>
  <mxm-tooltip
    ref="tooltipRef"
    trigger="click"
    :hide-timeout="hideAfter"
  >
    <template #content>
      <div
        class="mxm-popconfirm"
        :style="style"
      >
        <div class="mxm-popconfirm__main">
          <mxm-icon
            v-if="!hideIcon && icon"
            :icon="icon"
            :color="iconColor"
          ></mxm-icon>
          {{ title }}
        </div>
        <div class="mxm-popconfirm__action">
          <mxm-button
            class="mxm-popconfirm__cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText }}
          </mxm-button>
          <mxm-button
            class="mxm-popconfirm__confirm"
            size="small"
            :type="confirmButtonType"
            @click="confirm"
          >
            {{ confirmButtonText }}
          </mxm-button>
        </div>
      </div>
    </template>

    <template #default>
      <slot
        v-if="$slots.default"
        name="default"
      ></slot>
      <slot
        v-if="$slots.reference"
        name="reference"
      ></slot>
    </template>
  </mxm-tooltip>
</template>

<script setup lang="ts">
import MxmTooltip from '../Tooltip/Tooltip.vue'
import MxmButton from '../Button/Button.vue'
import MxmIcon from '../Icon/Icon.vue'
import { ref, computed } from 'vue'
import { addUnit } from '@mxm-ui/utils'
import type { TooltipInstance } from '../Tooltip'
import type { PopconfirmProps, PopconfirmEmits } from './types'

defineOptions({
  name: 'MxmPopconfirm',
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '',
  confirmButtonType: 'primary',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  icon: 'question-circle',
  iconColor: '#f90',
  hideAfter: 200,
  width: 150,
})

const emits = defineEmits<PopconfirmEmits>()

const style = computed(() => {
  return {
    width: addUnit(props.width),
  }
})

//confirm及cancel的回调逻辑
const tooltipRef = ref<TooltipInstance>()

const hidePopper = () => {
  tooltipRef.value?.hide()
}

const confirm = (e: MouseEvent) => {
  emits('confirm', e)
  hidePopper()
}

const cancel = (e: MouseEvent) => {
  emits('cancel', e)
  hidePopper()
}
</script>

<style scoped>
@import './style.css';
</style>
