<template>
  <mxm-button plain @click="open"> Hide close button </mxm-button>
</template>

<script lang="ts" setup>
import {MxmNotification} from 'mxm-ui'

const open = () => {
  MxmNotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  })
}
</script>