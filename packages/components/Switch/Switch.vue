<template>
  <div
    class="mxm-switch"
    :class="{
      [`mxm-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked,
    }"
    @click="changeHandler"
  >
    <input
      :id="inputId"
      ref="inputRef"
      class="mxm-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="changeHandler"
    />
    <div class="mxm-switch__core">
      <div class="mxm-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="mxm-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="mxm-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useId } from '@mxm-ui/hooks'
import type { SwitchProps, SwitchEmits, SwitchInstance } from './types'

defineOptions({
  name: 'MxmSwitch',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})

const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const isDisabled = computed(() => props.disabled)

const inputRef = ref<HTMLInputElement>()
const inputId = useId().value
const checked = computed(() => innerValue.value === props.activeValue)

const focus: SwitchInstance['focus'] = () => {
  inputRef.value?.focus()
}

function changeHandler() {
  if (isDisabled.value) return

  const newVal = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newVal

  emits('change', newVal)
  emits('update:modelValue', newVal)
}

onMounted(() => {
  inputRef.value!.checked = checked.value
})

watch(checked, (newVal) => {
  inputRef.value!.checked = newVal
  //form校验
})

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)

defineExpose<SwitchInstance>({
  checked,
  focus,
})
</script>

<style scoped>
@import './style.css';
</style>
