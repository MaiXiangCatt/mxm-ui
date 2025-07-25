<template>
  <div class="select-demo1">
    <mxm-select 
      :options="items" 
      v-model="currentValue1" 
      placeholder="Please select"
      style="width: 240px;"
    >
    </mxm-select>
    <mxm-select v-model="currentValue2" placeholder="Please select" style="width: 240px;">
      <mxm-option
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </mxm-option>
    </mxm-select>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentValue1 = ref('')
const currentValue2 = ref('')

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