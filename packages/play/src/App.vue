<template>
  <div>
    <mxm-button type="primary" size="large" icon="home"></mxm-button>
    <br>
    <br>
    <br>
    <mxm-collapse v-model="activeNames" accordion>
      <mxm-collapse-item title="consistency" name="1">
        <div>Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;</div>
      </mxm-collapse-item>
      <mxm-collapse-item title="testB" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
      </mxm-collapse-item>
    </mxm-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeNames = ref(['1'])
</script>

<style scoped>

</style>