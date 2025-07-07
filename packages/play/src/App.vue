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
    <br>
    <mxm-tooltip content="This is a test tooltip" placement="bottom-start" trigger="click" ref="tooltipEl">
      <mxm-button type="danger" icon="user">This is TooltipButton</mxm-button>
    </mxm-tooltip>

    <mxm-popconfirm title="你确定要删除吗" @confirm="confirmDelete">
      <mxm-button type="danger" icon="delete">删除</mxm-button>
    </mxm-popconfirm>
    <br>
    <mxm-dropdown :items="dropdownItems" trigger="click">
      <span class="dropdown-link">
        Dropdown List
        <mxm-icon icon="angle-down"></mxm-icon>
      </span>
      <!-- <template #dropdown>
        <mxm-dropdown-item>1</mxm-dropdown-item>
        <mxm-dropdown-item>2</mxm-dropdown-item>
        <mxm-dropdown-item>3</mxm-dropdown-item>
        <mxm-dropdown-item>4</mxm-dropdown-item>
      </template> -->
    </mxm-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import type { TooltipInstance } from '../../components/Tooltip/types';

const activeNames = ref(["1"])
// setTimeout(() => {
//   activeNames.value.splice(0, 1, "3")
// }, 3000);

const tooltipEl = ref<TooltipInstance>()

const confirmDelete = () => {
  console.log('confirm')
}

const dropdownItems = [
  { label: h('b', 'this is a bold node')},
  { label: 'b', divided: true},
  { label: 'c', divided: true},
  { label: 'd', disabled: true, divided: true}
]
</script>

<style scoped>

</style>