<template>
  <mxm-switch
    v-model="value"
    size="large"
    active-text="Open"
    inactive-text="Close"
  />
  <br />
  <mxm-switch v-model="value" active-text="Open" inactive-text="Close" />
  <br />
  <mxm-switch
    v-model="value"
    size="small"
    active-text="Open"
    inactive-text="Close"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>