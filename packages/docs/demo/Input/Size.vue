<template>
  <div class="input-demo">
    <mxm-input
      v-model="input1"
      style="width: 240px;"
      size="large"
      placeholder="Please Input"
    />
    <mxm-input
      v-model="input2"
      style="width: 240px"
      placeholder="Please Input"
    />
    <mxm-input
      v-model="input3"
      style="width: 240px"
      size="small"
      placeholder="Please Input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>
