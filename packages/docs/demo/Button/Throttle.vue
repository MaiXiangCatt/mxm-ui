<template>
  <div>
    <mxm-button @click="btnClickHandler"> with throttle</mxm-button>
    <mxm-button @click="btnClickHandler" :use-throttle="false">without throttle</mxm-button>
  </div>
</template>

<script setup>
import { MxmMessage } from 'mxm-ui';
function btnClickHandler() {
  MxmMessage.info('button has been clicked')
}
</script>