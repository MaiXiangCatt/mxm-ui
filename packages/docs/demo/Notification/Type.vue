<template>
  <mxm-button plain @click="open1"> Success </mxm-button>
  <mxm-button plain @click="open2"> Warning </mxm-button>
  <mxm-button plain @click="open3"> Info </mxm-button>
  <mxm-button plain @click="open4"> Error </mxm-button>
</template>

<script setup lang="ts">
import { MxmNotification } from "mxm-ui";

const open1 = () => {
  MxmNotification({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
};

const open2 = () => {
  MxmNotification({
    title: "Warning",
    message: "This is a warning message",
    type: "warning",
  });
};

const open3 = () => {
  MxmNotification({
    title: "Info",
    message: "This is an info message",
    type: "info",
  });
};

const open4 = () => {
  MxmNotification({
    title: "Error",
    message: "This is an error message",
    type: "danger",
  });
};
</script>