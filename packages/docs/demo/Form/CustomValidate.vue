<template>
  <mxm-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    @submit.prevent="onSubmit(formRef)"
  >
    <mxm-form-item label="Activity name" prop="name">
      <mxm-input v-model="form.name" />
    </mxm-form-item>
    <mxm-form-item label="Password" prop="password">
      <mxm-input v-model="form.password" type="password" />
    </mxm-form-item>
    <mxm-form-item label="Password Confirm" prop="passwordConfirm">
      <mxm-input v-model="form.passwordConfirm" type="password" />
    </mxm-form-item>
    <mxm-form-item>
      <mxm-button type="primary" native-type="submit">Create</mxm-button>
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
  password: "",
  passwordConfirm: "",
});

const rules: any = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
  passwordConfirm: [
    {
      required: true,
      trigger: "blur",
      message: "请再次输入密码",
    },
    {
      validator: (_: typeof rules, value: string) => value === form.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
});

const onSubmit = async (instance?: FormInstance) => {
  const valid = await instance?.validate();
  if (!valid) return;
  MxmMessage.success("submit!");
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>
