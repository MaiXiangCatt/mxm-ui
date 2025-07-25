<template>
  <mxm-select v-model="value" placeholder="Select" style="width: 240px">
    <mxm-option
      v-for="city in cities"
      :key="city.value"
      :label="city.label"
      :value="city.value"
    >
      <span style="float: left">{{ city.label }}</span>
      <span
        style="
          float: right;
          color: #63065f;
          font-size: 13px;
        "
      >
        {{ city.value }}
      </span>
    </mxm-option>
  </mxm-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')

const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
]
</script>
