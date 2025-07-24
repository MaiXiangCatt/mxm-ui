<script setup lang="ts">
import { MxmNotification } from 'mxm-ui'

const open = () => {
  MxmNotification.success({
    title: 'Success',
    message: 'This is a success message',
    offset: 100,
  })
}
</script>

<template>
  <mxm-button plain @click="open"> Notification with offset </mxm-button>
</template>

