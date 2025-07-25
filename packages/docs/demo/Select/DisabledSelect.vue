<template>
  <div class="select-demo1">
    <mxm-select 
      :options="items" 
      v-model="currentValue1" 
      placeholder="Disabled select"
      style="width: 240px;"
      disabled
    >
    </mxm-select>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentValue1 = ref('')

const items = [
  {
    label: 'Option1',
    value: '1'
  },
  {
    label: 'Option2',
    value: '2'
  },
  {
    label: 'Option3',
    value: '3'
  },
  {
    label: 'Option4',
    value: '4'
  },
  {
    label: 'Option5',
    value: '5'
  },
]

</script>