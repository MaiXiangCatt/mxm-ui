<template>
  <div class="mxm-button-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ButtonGroupProps } from './types';
import { BUTTON_GROUP_CTX_KEY } from './constant';
import { provide, reactive, toRef } from 'vue';

defineOptions({
  name: 'MxmButtonGroup'
})

const props = defineProps<ButtonGroupProps>()

provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled")
  })
)
</script>

<style scoped>

</style>