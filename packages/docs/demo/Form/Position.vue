<template>
  <mxm-button-group size="small">
    <mxm-button
      @click="labelPosition = 'left'"
      :type="labelPosition === 'left' ? 'primary' : 'info'"
      >Left</mxm-button
    >
    <mxm-button
      @click="labelPosition = 'right'"
      :type="labelPosition === 'right' ? 'primary' : 'info'"
      >Right</mxm-button
    >
    <mxm-button
      @click="labelPosition = 'top'"
      :type="labelPosition === 'top' ? 'primary' : 'info'"
      >Top</mxm-button
    >
  </mxm-button-group>
  <div style="margin: 20px"></div>
  <mxm-form :model="form" :label-position="labelPosition">
    <mxm-form-item label="Activity name">
      <mxm-input v-model="form.name" />
    </mxm-form-item>
    <mxm-form-item label="Activity zone">
      <mxm-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </mxm-form-item>
    <mxm-form-item label="Instant delivery">
      <mxm-switch v-model="form.delivery" />
    </mxm-form-item>
    <mxm-form-item label="Activity form">
      <mxm-input v-model="form.desc" type="textarea" />
    </mxm-form-item>
    <mxm-form-item>
      <mxm-button type="primary" @click="onSubmit">Create</mxm-button>
      <mxm-button>Cancel</mxm-button>
    </mxm-form-item>
  </mxm-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { MxmMessage, type FormProps } from "mxm-ui";

const form = reactive({
  name: "",
  region: "",
  delivery: false,
  desc: "",
});
const options = ref([
  { value: "1", label: "Peiking" },
  { value: "2", label: "Nanjing" },
]);
const labelPosition = ref<FormProps["labelPosition"]>("right");

const onSubmit = () => {
  MxmMessage.success("submit");
};
</script>
