<template>
  <mxm-input 
    v-model="inputValue" 
    style="width: 240px;" 
    placeholder="Please input" 
    show-password
  >
  </mxm-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('')
</script>