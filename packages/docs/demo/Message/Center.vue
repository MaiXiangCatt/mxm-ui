<template>
  <mxm-button plain @click="openCenter">Centered text</mxm-button>
</template>

<script setup lang="ts">
import { MxmMessage } from "mxm-ui";

const openCenter = () => {
  MxmMessage({
    showClose: true,
    message: "Centered text",
    center: true
  });
};
</script>