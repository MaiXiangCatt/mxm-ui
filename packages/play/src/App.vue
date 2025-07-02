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
      <mxm-collapse-item title="testC" name="3">
        <div>测试测试测试测试测试测试v</div>
      </mxm-collapse-item>
    </mxm-collapse>
    <h2>{{ activeNames }}</h2>
    <mxm-icon icon="user" type="primary"></mxm-icon>
    <mxm-alert type="success" title="测试标题" description="测试内容test" center="true"></mxm-alert>
    <mxm-alert type="primary" title="primary颜色主题" description="测试测试测试" :closable="false"></mxm-alert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeNames = ref(["1"])
// setTimeout(() => {
//   activeNames.value.splice(0, 1, "3")
// }, 3000);
</script>

<style scoped>

</style>