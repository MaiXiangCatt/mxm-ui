<template>
  <div class="input-demo">
    <mxm-input v-model="input1" style="width: 240px;" placeholder="Pick a date" id=input1>
      <template #suffix>
        <mxm-icon icon="calendar-days"></mxm-icon>
      </template>
    </mxm-input>
    <mxm-input v-model="input2" style="width: 240px;" placeholder="Search something">
      <template #prefix>
        <mxm-icon icon="search"></mxm-icon>
      </template>
    </mxm-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
</script>

<style scoped>
.input-demo {
  display: flex;
  justify-content: space-between;
}
</style>