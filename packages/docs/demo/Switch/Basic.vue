<template>
  <mxm-switch v-model="value1" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
</script>