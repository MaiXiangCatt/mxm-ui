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
    'is-focus': isFocused
    }">
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="mxm-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="mxm-input__wrapper" ref="wrapperRef">
        <span v-if="$slots.prefix" class="mxm-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="mxm-input__inner"
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : 'text'"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handlerInput"
          @change="handlerChange"
          @focus="handlerFocus"
          @blur="handlerBlur"
          >
          <span v-if="$slots.suffix || showClear || showPasswordSwitch" class="mxm-input__suffix">
            <slot name="suffix"></slot>
            <Icon
              v-if="showClear"
              icon="circle-xmark"
              class="mxm-input__clear"
              @click="clear"
              @mousedown.prevent="noop"></Icon>
            <Icon
              v-if="passwordVisible && showPasswordSwitch"
              icon="eye"
              class="mxm-input__password"
              @click="togglePasswordVisible"></Icon>
            <Icon
              v-if="!passwordVisible && showPasswordSwitch"
              icon="eye-slash"
              class="mxm-input__password"
              @click="togglePasswordVisible"></Icon>
          </span>
      </div>
      <div v-if="$slots.append" class="mxm-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        class="mxm-textarea__wrapper"
        ref="textareaRef"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handlerInput"
        @change="handlerChange"
        @focus="handlerFocus"
        @blur="handlerBlur"></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, useAttrs, watch } from 'vue';
import useFocusController from '@mxm-ui/hooks/useFocusController';
import type { InputProps, InputEmits, InputInstance } from './types';
import Icon from '../Icon/Icon.vue';
import { noop } from 'lodash-es';


defineOptions({
  name: 'MxmInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})

const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
const passwordVisible = ref(false)

const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => {
  if(props.type === 'text') {
    return inputRef.value
  }
  if(props.type === 'textarea') {
    return textareaRef.value
  }
})

const attrs = useAttrs()

const isDisabled = computed(() => props.disabled)

const showClear = computed(() => {
  if(props.clearable && !!innerValue.value && !isDisabled.value && isFocused.value) {
    return true
  }
  return false
})

const showPasswordSwitch = computed(() => {
  if(props.type === 'password' && !!innerValue.value && !isDisabled.value && props.showPassword) {
    return true
  }
  return false
})

const { wrapperRef, isFocused, handlerBlur, handlerFocus} = useFocusController(_ref, {
  afterBlur() {
    //表单校验的逻辑
  }
})

const clear: InputInstance['clear'] = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('input', '')
  emits('change', '')
  emits('clear')
  //表单校验
}

const focus: InputInstance['focus'] = async() => {
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

watch(() => props.modelValue, (newVal) => {
  innerValue.value = newVal
  //表单校验触发
})

defineExpose<InputInstance>({
  ref: _ref,
  clear,
  focus,
  blur,
  select
})
</script>

<style scoped>
@import './style.css'
</style>