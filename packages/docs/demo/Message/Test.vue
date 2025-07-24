<template>
  <div class="message-demo">
    <mxm-button @click="open1">插件式调用</mxm-button>
    <mxm-button @click="open2">函数式调用</mxm-button>
    <mxm-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</mxm-button
    >
  </div>
</template>

<script lang="ts" setup>
import { MxmMessage } from "mxm-ui";

const open1 = () => {
  MxmMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open2 = () => {
  MxmMessage.success("Congrats, this is a success message.");
};
</script>