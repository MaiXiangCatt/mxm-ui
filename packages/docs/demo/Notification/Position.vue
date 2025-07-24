<template>
  <mxm-button plain @click="open1"> Top Right </mxm-button>
  <mxm-button plain @click="open2"> Bottom Right </mxm-button>
  <mxm-button plain @click="open3"> Bottom Left </mxm-button>
  <mxm-button plain @click="open4"> Top Left </mxm-button>
</template>

<script setup lang="ts">
import { MxmNotification } from 'mxm-ui';

const open1 = () => {
  MxmNotification({
    title: 'Custom Position',
    message: "I'm at the top right corner"
  })
}

const open2 = () => {
  MxmNotification({
    title: 'Custom Position',
    message: "I'm at the bottom right corner",
    position: 'bottom-right',
  })
}

const open3 = () => {
  MxmNotification({
    title: 'Custom Position',
    message: "I'm at the bottom left corner",
    position: 'bottom-left',
  })
}

const open4 = () => {
  MxmNotification({
    title: 'Custom Position',
    message: "I'm at the top left corner",
    position: 'top-left',
  })
}
</script>