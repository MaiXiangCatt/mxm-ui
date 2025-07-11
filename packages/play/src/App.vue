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
      <mxm-button type="danger">删除</mxm-button>
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
    <br>
    <br>
    <mxm-button is-plain: true @click="open1">Info test Message</mxm-button>
    <mxm-button type="success" @click="open2">Success test Message</mxm-button> 
    <mxm-button type="warning" @click="open3">Warning test Message</mxm-button>
    <mxm-button type="danger" @click="open4">Danger test Message</mxm-button>
    <mxm-button type="primary" @click="closeAll">点击关闭所有message</mxm-button>
    <br>
    <br>
    <mxm-button type="info" @click="oepnNotification1">top-right Notification test</mxm-button>
    <mxm-button type="success" @click="openNotification2">bottom-left Notification test</mxm-button>
    <mxm-button type="primary" @click="closeAllNotifications">关闭所有</mxm-button>
    <br>
    <br>
    <mxm-input v-model="inputValue" clearable style="width: 200px;"></mxm-input>
    <br>
    <mxm-input type="password" v-model="inputValue2" showPassword style="width: 240px;"></mxm-input>
    <br>
    <mxm-input v-model="inputValue3" placeholder="请输入内容" disabled></mxm-input>
  </div>

</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import type { TooltipInstance } from '../../components/Tooltip/types';
import { MxmMessage, MxmNotification } from 'mxm-ui';

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

const open1 = () => {
  MxmMessage({
    showClose: true,
    message: 'This is a info message'
  })
}

const open2 = () => {
  MxmMessage.success('This is a success message')
}

const open3 = () => {
  MxmMessage({
    showClose: true,
    message: 'This is a warning message',
    type: 'warning'
  })
}

const open4 = () => {
  MxmMessage.danger('This is a danger message')
}

const closeAll = () => {
  MxmMessage.closeAll()
}

const oepnNotification1 = () => {
  MxmNotification({
    title: 'test notification',
    message: 'top-right notification'
  })
}

const openNotification2 = () => {
  MxmNotification({
    title: 'test',
    message: 'bottom-left notification',
    type: 'success',
    position: 'bottom-left'
  })
}

const closeAllNotifications = () => {
  MxmNotification.closeAll()
}

const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
</script>

<style scoped>

</style>