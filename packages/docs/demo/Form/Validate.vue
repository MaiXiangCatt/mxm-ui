<template>
  <mxm-form ref="formRef" :model="form" :rules="rules">
    <mxm-form-item label="Activity name" prop="name">
      <mxm-input v-model="form.name" />
    </mxm-form-item>
    <mxm-form-item label="Activity zone" prop="region">
      <mxm-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </mxm-form-item>
    <mxm-form-item label="Instant delivery" prop="delivery">
      <mxm-switch v-model="form.delivery" />
    </mxm-form-item>
    <mxm-form-item label="Activity form" prop="desc">
      <mxm-input v-model="form.desc" type="textarea" />
    </mxm-form-item>
    <mxm-form-item>
      <mxm-button type="primary" @click="onSubmit">Create</mxm-button>
      <mxm-button @click="onReset">Reset</mxm-button>
    </mxm-form-item>
  </mxm-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { MxmMessage, type FormInstance } from "mxm-ui";

const formRef = ref<FormInstance>();
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

const rules = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
});

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      MxmMessage.success("submit!");
    }
  });
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>