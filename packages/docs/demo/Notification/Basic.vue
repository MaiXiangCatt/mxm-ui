<template>
  <mxm-button @click="openNotify1" plain>Closes automatically</mxm-button>
  <mxm-button @click="openNotify2" plain>Won't closes automatically</mxm-button>
</template>

<script setup lang="ts">
import { h } from "vue";
import { MxmNotification } from "mxm-ui";

function openNotify1() {
  MxmNotification({
    title: "Title",
    message: h("i", { style: "color:teal" }, "This is a remider"),
  });
}

function openNotify2() {
  MxmNotification({
    title: "Prompt",
    message: "This is a message that does not auto close",
    duration: 0,
  });
}
</script>