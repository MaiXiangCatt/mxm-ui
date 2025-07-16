<template>
  <form class="mxm-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import type {
  FormProps,
  FormEmits,
  FormItemContext,
  FormContext,
  FormInstance,
  FormValidateCallback,
} from './types'
import { FORM_CTX_KEY } from './constans'
import { includes, keys, size } from 'lodash-es'
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
  name: 'MxmForm',
})
const props = withDefaults(defineProps<FormProps>(), {
  showMessage: true,
  hideRequireAsterisk: false,
  requiredAsteriskPosition: 'left',
  labelPosition: 'right',
})

const emits = defineEmits<FormEmits>()

const fields: FormItemContext[] = []

const addField: FormContext['addField'] = (field) => {
  if (!field.prop) return
  fields.push(field)
}

function filterFields(fields: FormItemContext[], keys: string[]) {
  return size(keys)
    ? fields.filter((field) => includes(keys, field.prop))
    : fields
}

const removeField: FormContext['removeField'] = (field) => {
  if (!field.prop) return
  fields.splice(fields.indexOf(field), 1)
}

async function doValidateField(fields: FormItemContext[] = []) {
  let validateErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (error) {
      validateErrors = {
        ...validateErrors,
        ...(error as ValidateFieldsError),
      }
    }
  }
  if (!size(Object.keys(validateErrors))) return true
  return Promise.reject(validateErrors)
}

const validate: FormInstance['validate'] = (callback) => {
  return validateField([], callback)
}
//这里的keys如果不传就是整个表单都要校验
const validateField: FormInstance['validateField'] = async (keys, callback) => {
  const filterArr = filterFields(fields, keys ?? [])

  try {
    const result = await doValidateField(filterArr)
    if (result === true) {
      callback?.(result)
    }
    return result
  } catch (error) {
    if (error instanceof Error) throw error
    const inValidFields = error as ValidateFieldsError
    callback?.(false, inValidFields)
    return Promise.reject(inValidFields)
  }
}

const resetFields: FormInstance['resetFields'] = (keys) => {
  filterFields(fields, keys).forEach((field) => field.resetField())
}
const clearValidate: FormInstance['clearValidate'] = (keys) => {
  filterFields(fields, keys).forEach((field) => field.clearValidate())
}

const formCTX: FormContext = reactive({
  ...toRefs(props),
  emits,
  addField,
  removeField,
})

provide<FormContext>(FORM_CTX_KEY, formCTX)

defineExpose<FormInstance>({
  validate,
  validateField,
  resetFields,
  clearValidate,
})
</script>

<style scoped></style>
