<script setup lang="ts">
import { MxmMessage } from "mxm-ui";

const open1 = () => {
  MxmMessage("This is a message.");
};
const open2 = () => {
  MxmMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  MxmMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  MxmMessage.error("Oops, this is a error message.");
};
const open5 = () => {
  MxmMessage.primary('Hello, this is a primary message')
}
</script>

<template>
  <mxm-button :plain="true" @click="open2">Success</mxm-button>
  <mxm-button :plain="true" @click="open3">Warning</mxm-button>
  <mxm-button :plain="true" @click="open1">Info</mxm-button>
  <mxm-button :plain="true" @click="open4">Error</mxm-button>
  <mxm-button :plain="true" @click="open5">Primary</mxm-button>
</template>