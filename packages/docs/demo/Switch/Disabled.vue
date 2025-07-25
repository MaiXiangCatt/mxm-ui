<template>
  <mxm-switch v-model="value1" disabled />
  <br>
  <mxm-switch v-model="value2" class="ml-2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>