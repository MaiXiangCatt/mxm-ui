<template>
  <mxm-button @click="disabled = !disabled">
    click to {{ disabled ? "active" : "close" }} tooltip function
  </mxm-button>
  <mxm-tooltip
    :disabled="disabled"
    content="this is a tooltip"
    placement="top"
  >
    <mxm-button class="tooltipBtn">Tooltip</mxm-button>
  </mxm-tooltip>
</template>

<script setup lang="ts">
import { ref } from "vue";

const disabled = ref(false);
</script>

<style scoped>
.tooltipBtn {
  margin-left: 15px;
}
</style>