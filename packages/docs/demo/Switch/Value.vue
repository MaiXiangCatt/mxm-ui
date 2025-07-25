<template>
  <mxm-tooltip :content="'Switch value: ' + value" placement="top">
    <mxm-switch
      v-model="value"
      active-value="100"
      inactive-value="0"
    />
  </mxm-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('100')
</script>