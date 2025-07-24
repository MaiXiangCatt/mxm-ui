<template>
  <div class="message-demo">
    <mxm-button :plain="true" @click="callMessage">Show Message</mxm-button>
    <mxm-button :plain="true" @click="callMessageVn">Vnode</mxm-button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { MxmMessage } from 'mxm-ui';

const callMessage = () => {
  MxmMessage('This is a message')
}
const callMessageVn = () => {
  MxmMessage({
     message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  })
}
</script>