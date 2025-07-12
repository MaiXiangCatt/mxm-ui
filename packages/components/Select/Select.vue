<template>
  <div 
    ref="selectRef"
    class="mxm-select"
    :class="{
      'is-disabled': isDisabled
    }"
    @click.stop="toggleVisible"
    @mouseenter="selectStates.mouseHover = true"
    @mouseleave="selectStates.mouseHover = false">
    <mxm-tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="POPPER_OPTIONS"
      @click-outside="controlVisible(false)"
      manual
      >
      <template #default>
        <div ref="inputWrapperRef">
          <mxm-input
            ref="inputRef"
            v-model="selectStates.inputValue"
            :id="inputId"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :readonly="!filterable || !isDropdownVisible"
            @focus="handlerFocus"
            @blur="handlerBlur"
            >
            <template #suffix>
              <mxm-icon
                v-if="showClear"
                icon="circle-xmark"
                class="mxm-input__clear"
                @click.stop="handleClear"
                @mousedown.prevent="noop"
                >
              </mxm-icon>
              <mxm-icon
                v-else
                icon="angle-down"
                class="header-angle"
                :class="{ 'is-active': isDropdownVisible}">
              </mxm-icon>
            </template>
          </mxm-input>
        </div>
      </template>
      <template #content>
        <!-- <div class="mxm-select__loading" v-if="selectStates.loading">
          <mxm-icon icon="spinner" spin></mxm-icon>
        </div> -->
        <!-- <div class="mxm-select__nodata" v-else-if="filterable && isNoData">
          No data
        </div> -->
        <ul class="mxm-select__menu">
          <template v-if="!hasChilidren">
            <mxm-option
              v-for="item in options"
              :key="item.value"
              v-bind="item">
            </mxm-option>
          </template>
          <template v-else>
            <slot></slot>
            <!-- <template
              v-for="[vNode, _props] in filteredChilds"
              :key="_props.value">
              <render-vnode :v-node="vNode"></render-vnode>
            </template> -->
          </template>
        </ul>
      </template>
    </mxm-tooltip>
  </div>
</template>

<script setup lang="ts">
import MxmTooltip from '../Tooltip/Tooltip.vue';
import MxmInput from '../Input/Input.vue';
import MxmIcon from '../Icon/Icon.vue';
import MxmOption from './Option.vue'

import type { SelectProps, SelectEmits, SelectContext, SelectInstance, SelectStates, SelectOptionProps } from './types';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../Input/types';
import { POPPER_OPTIONS, SELECT_CTX_KEY } from './constant';
import { RenderVnode } from '@mxm-ui/utils';
import { useId } from '@mxm-ui/hooks';
import { computed, ref, reactive, type VNode, provide, nextTick, watch } from 'vue';
import { noop, filter, eq, size, isFunction, find } from 'lodash-es';
import { useFocusController, useClickOutside } from '@mxm-ui/hooks';

defineOptions({
  name: 'MxmSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const emits = defineEmits<SelectEmits>()
const slots = defineSlots()

const selectRef = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()

const isDropdownVisible = ref(false)

const initialOption = findOption(props.modelValue)
const selectStates = reactive<SelectStates>({
  inputValue: initialOption?.label ?? '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightedIndex: -1
})

const isDisabled = computed(() => props.disabled)
const children = computed(() => {
  return filter(slots?.default?.(), (child) => eq(child.type, MxmOption))
})
const hasChilidren = computed(() => size(children.value) > 0)
const showClear = computed(() => props.clearable && selectStates.mouseHover && selectStates.inputValue !== '')
const highlightedLine = computed(() => {
  let result: SelectOptionProps | void;
  if(hasChilidren.value) {
    const node = children.value[selectStates.highlightedIndex] 
    result = node?.props?.value
  } else {
    result = props.options[selectStates.highlightedIndex]
  }
  return result
})
const inputId = useId().value

const {
  wrapperRef: inputWrapperRef,
  isFocused,
  handlerFocus,
  handlerBlur
} = useFocusController(inputRef)

useClickOutside(selectRef, (e) => handleClickOutside(e))

const focus: SelectInstance['focus'] = () => {
  inputRef.value?.focus()
}

const blur: SelectInstance['blur'] = () => {
  handleClickOutside()
}

function handleClickOutside(e?: Event) {
  if(isFocused.value) {
    nextTick(() => handlerBlur(new FocusEvent('focus', e)))
  }
}

function findOption(value: string) {
  return find(props.options, (option) => option.value === value)
}

function controlVisible(visible: boolean) {
  //这里传的visible其实是接下来要进行的打开/关闭操作（如果为true就是打开...）
  if(!tooltipRef.value) return;
  if(visible) {
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }
  isDropdownVisible.value = visible
  emits('visible-change', visible)

  selectStates.highlightedIndex = -1
}
function toggleVisible() {
  if(isDisabled.value) return;
  controlVisible(!isDropdownVisible.value)
}
function handleClear() {
  inputRef.value?.clear()
  selectStates.inputValue = ''
  selectStates.selectedOption = null

  emits('clear')
  emits('update:modelValue', '')
  emits('change', '')
}
function renderLabel(options: SelectOptionProps): VNode | string {
  if(isFunction(props.renderLabel)) {
    return props.renderLabel(options)
  }
  return options.label
}
function handleSelect(options: SelectOptionProps) {
  if(isDisabled.value) return;

  selectStates.inputValue = options.label
  selectStates.selectedOption = options
  emits('update:modelValue', options.value)
  emits('change', options.value)
  controlVisible(false)
  inputRef.value?.focus()
}
function setSelected() {
  const option = findOption(props.modelValue)
  if(!option) return;
  selectStates.inputValue = option.label
  selectStates.selectedOption = option
}

watch(() => props.modelValue, () => {
  setSelected()
})

provide<SelectContext>(SELECT_CTX_KEY, {
  handleSelect,
  selectStates,
  renderLabel,
  highlightedLine
})

defineExpose<SelectInstance>({
  focus,
  blur
})
</script>

<style scoped>
@import './style.css'
</style>