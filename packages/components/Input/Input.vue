<template>
  <div
    class="mxm-input"
    :class="{
      [`mxm-input--${type}`]: type,
      [`mxm-input--${size}`]: size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocused,
    }"
  >
    <!-- input的情况 -->
    <template v-if="type !== 'textarea'">
      <!-- prepend -->
      <div
        v-if="$slots.prepend"
        class="mxm-input__prepend"
      >
        <slot name="prepend"></slot>
      </div>
      <div
        ref="wrapperRef"
        class="mxm-input__wrapper"
      >
        <!-- prefix -->
        <span
          v-if="$slots.prefix"
          class="mxm-input__prefix"
        >
          <slot name="prefix"></slot>
        </span>
        <input
          :id="inputId"
          ref="inputRef"
          v-model="innerValue"
          class="mxm-input__inner"
          :type="
            showPassword ? (passwordVisible ? 'text' : 'password') : 'text'
          "
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-bind="attrs"
          @input="handlerInput"
          @change="handlerChange"
          @focus="handlerFocus"
          @blur="handlerBlur"
        />
        <!-- suffix -->
        <span
          v-if="$slots.suffix || showClear || showPasswordSwitch"
          class="mxm-input__suffix"
          @click="focus"
        >
          <slot name="suffix"></slot>
          <mxm-icon
            v-if="showClear"
            icon="circle-xmark"
            class="mxm-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          ></mxm-icon>
          <mxm-icon
            v-if="passwordVisible && showPasswordSwitch"
            icon="eye"
            class="mxm-input__password"
            @click="togglePasswordVisible"
          ></mxm-icon>
          <mxm-icon
            v-if="!passwordVisible && showPasswordSwitch"
            icon="eye-slash"
            class="mxm-input__password"
            @click="togglePasswordVisible"
          ></mxm-icon>
        </span>
      </div>
      <!-- append -->
      <div
        v-if="$slots.append"
        class="mxm-input__append"
      >
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea的情况 -->
    <template v-else>
      <textarea
        :id="inputId"
        ref="textareaRef"
        v-model="innerValue"
        class="mxm-textarea__wrapper"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-bind="attrs"
        @input="handlerInput"
        @change="handlerChange"
        @focus="handlerFocus"
        @blur="handlerBlur"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, useAttrs, watch } from 'vue'
import useFocusController from '@mxm-ui/hooks/useFocusController'
import MxmIcon from '../Icon/Icon.vue'
import { noop } from 'lodash-es'
import { useFormItem, useFormDisabled, useFormItemInputId } from '../Form'
import { debugWarn } from '@mxm-ui/utils'
import type { InputProps, InputEmits, InputInstance } from './types'

defineOptions({
  name: 'MxmInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
})

const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
const passwordVisible = ref(false)

const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => inputRef.value || textareaRef.value)

const attrs = useAttrs()

// const isDisabled = computed(() => props.disabled)
const isDisabled = useFormDisabled()
const { formItem } = useFormItem()
const { inputId } = useFormItemInputId(props, formItem)

const showClear = computed(() => {
  if (
    props.clearable &&
    !!innerValue.value &&
    !isDisabled.value &&
    isFocused.value
  ) {
    return true
  }
  return false
})

const showPasswordSwitch = computed(() => {
  if (
    props.type === 'password' &&
    !!innerValue.value &&
    !isDisabled.value &&
    props.showPassword
  ) {
    return true
  }
  return false
})

const { wrapperRef, isFocused, handlerBlur, handlerFocus } = useFocusController(
  _ref,
  {
    afterBlur() {
      //表单校验的逻辑
      formItem?.validate('blur').catch((err) => debugWarn(err))
    },
  }
)

const clear: InputInstance['clear'] = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('input', '')
  emits('change', '')
  emits('clear')
  //表单校验
  formItem?.clearValidate()
}

const focus: InputInstance['focus'] = async () => {
  await nextTick()
  _ref.value?.focus()
}

const blur: InputInstance['blur'] = () => {
  _ref.value?.blur()
}
const select: InputInstance['select'] = () => {
  _ref.value?.select()
}

function handlerInput() {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}

function handlerChange() {
  emits('change', innerValue.value)
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
    //表单校验触发
    formItem?.validate('change').catch((err) => debugWarn(err))
  }
)

defineExpose<InputInstance>({
  ref: _ref,
  clear,
  focus,
  blur,
  select,
})
</script>

<style scoped>
@import './style.css';
</style>
