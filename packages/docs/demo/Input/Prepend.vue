<template>
  <div class="input-demo">
    <mxm-input v-model="input1" style="width: 200px;" placeholder="Pick a date" id=input1>
      <template #prepend>
        Http://
      </template>
    </mxm-input>
    <mxm-input v-model="input2" style="width: 200px;" placeholder="Search something">
      <template #append>
        .com
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