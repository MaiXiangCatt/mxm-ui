<template>
  <div class="alert demo">
    <mxm-alert title="Uncloseable alert" type="warning" :closable="false"></mxm-alert>
    <mxm-alert title="closeable alert with callback" type="success" @close="handleClose"></mxm-alert>
  </div>
</template>

<script setup>
import { MxmMessage } from 'mxm-ui';
function handleClose() {
  MxmMessage.success('Hello World')
}
</script>