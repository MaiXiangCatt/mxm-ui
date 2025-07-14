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
            :placeholder="filterable ? filterPlaceholder : placeholder"
            :readonly="!filterable || !isDropdownVisible"
            @focus="handlerFocus"
            @blur="handlerBlur"
            @input="handleFilterDebounce"
            @keydown="handleKeyDown"
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
        <div class="mxm-select__loading" v-if="selectStates.loading">
          <mxm-icon icon="spinner" spin></mxm-icon>
        </div>
        <div class="mxm-select__nodata" v-else-if="filterable && isNoData">
          No data
        </div>
        <ul class="mxm-select__menu">
          <template v-if="!hasChilidren">
            <mxm-option
              v-for="item in filteredOptions"
              :key="item.value"
              v-bind="item">
            </mxm-option>
          </template>
          <template v-else>
            <template
              v-for="[vNode, _props] in filteredChilds"
              :key="_props.value">
              <render-vnode :v-node="vNode"></render-vnode>
            </template>
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
import { debugWarn, RenderVnode } from '@mxm-ui/utils';
import { useId } from '@mxm-ui/hooks';
import useKeyMap from './useKeyMap'
import { computed, ref, reactive, provide, nextTick, watch, h, onMounted } from 'vue';
import type { VNode} from 'vue';
import { noop, filter, eq, size, isFunction, find, map, assign, isNil, isBoolean, each, includes, get, debounce } from 'lodash-es';
import { useFocusController, useClickOutside } from '@mxm-ui/hooks';

const COMPONENT_NAME = 'MxmSelect'
defineOptions({
  name: COMPONENT_NAME
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const emits = defineEmits<SelectEmits>()
const slots = defineSlots()

const selectRef = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()
const filteredChilds = ref<Map<VNode, SelectOptionProps>>(new Map())
const filteredOptions = ref(props.options ?? [])

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
const childrenOptions = computed(() => {
  if(!hasChilidren.value) return [];
  return map(children.value, (child) => ({
    vNode: h(child),
    props: assign(child.props, {
      disabled: 
      child.props?.disabled === true || (!isNil(child.props?.disabled)) && (!isBoolean(child.props?.disabled))
    })
  }))
})

const hasData = computed(() => 
  (hasChilidren.value && filteredChilds.value.size > 0) || 
  (!hasChilidren.value && size(filteredOptions.value) > 0)
)
const isNoData = computed(() => {
  if(!props.filterable) return false;
  if(!hasData.value) return true;
  return false
})

const lastIndex = computed(() => hasChilidren.value 
  ? (filteredChilds.value.size - 1) 
  : (size(filteredOptions) - 1)
)
const showClear = computed(() => props.clearable && selectStates.mouseHover && selectStates.inputValue !== '')
const highlightedLine = computed(() => {
  let result: SelectOptionProps | void;
  if(hasChilidren.value) {
    const node = [...filteredChilds.value][selectStates.highlightedIndex]?.[0]
    result = filteredChilds.value.get(node)
  } else {
    result = filteredOptions.value[selectStates.highlightedIndex]
  }
  return result
})

const filterPlaceholder = computed(() => {
  if(props.filterable && selectStates.selectedOption && isDropdownVisible.value) {
    return selectStates.selectedOption.label
  } else {
    return props.placeholder
  }
})
const filtertimeout = computed(() => props.remote ? 300 : 100)

const inputId = useId().value

const {
  wrapperRef: inputWrapperRef,
  isFocused,
  handlerFocus,
  handlerBlur
} = useFocusController(inputRef)

const keyMap = useKeyMap({
  isDropdownVisible,
  highlightedLine,
  hasData,
  lastIndex,
  selectStates,
  controlVisible,
  handleSelect
})
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
//根据modelValue查找初始的Option
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
  if(props.filterable) {
    controlInputVal(visible)
  }
  isDropdownVisible.value = visible
  emits('visible-change', visible)

  selectStates.highlightedIndex = -1
}
//在controlVisible切换我们弹窗可见性的时候，我们要对input的value进行处理（弹窗下拉时看到placeholder，反之是label）
function controlInputVal(visible: boolean) {
  if(!props.filterable) return;
  if(visible) {
    if(selectStates.selectedOption) selectStates.inputValue = '';
    handleFilterDebounce()
  } else {
    selectStates.inputValue = selectStates.selectedOption?.label || ''
  }
}
function toggleVisible() {
  if(isDisabled.value) return;
  //真正去触发toggle的逻辑
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
//筛选的逻辑
async function callRemoteMethod(method: Function, searchKey: string) {
  if(!method || !isFunction(method)) return;
  
  selectStates.loading = true
  let result
  try{
    result = await method(searchKey)
  } catch(error) {
    debugWarn(error as Error)
    debugWarn(COMPONENT_NAME, 'callRemoteMethod error')
    result = []
    return Promise.reject(error)
  }
  return result
}
function setFilteredChilds(options: typeof childrenOptions.value) {
  filteredChilds.value.clear()
  each(options, (option) => {
    filteredChilds.value.set(option.vNode, option.props as SelectOptionProps)
  })
}
async function genFilteredChilds(searchKey: string) {
  if(!props.filterable) return;

  if(props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    await callRemoteMethod(props.remoteMethod, searchKey)
    setFilteredChilds(childrenOptions.value)
    return
  }
  if(props.filterMethod && isFunction(props.filterMethod)) {
    const options = props.filterMethod(searchKey).map((item) => item.value)
    const filteredChildren = childrenOptions.value.filter((item) => {
      return includes(options, get(item, ['props', 'value']))
    })
    setFilteredChilds(filteredChildren)
    return
  }
  //default
  setFilteredChilds(
    filter(childrenOptions.value, (item) => {
      return includes(get(item, ['props', 'label']), searchKey)
    })
  )
}
async function genFilteredOptions(searchKey: string) {
  if(!props.filterable) return;

  if(props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    filteredOptions.value = await callRemoteMethod(props.remoteMethod, searchKey)
    return
  }
  if(props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchKey)
    return
  }
  filteredOptions.value = props.options.filter((option) => option.label.includes(searchKey))
}
function handleFilter() {
  const searchKey = selectStates.inputValue
  selectStates.highlightedIndex = -1
  if(hasChilidren.value) {
    genFilteredChilds(searchKey)
  }
  genFilteredOptions(searchKey)
}
const handleFilterDebounce = debounce(handleFilter, filtertimeout.value)

function handleKeyDown(e: KeyboardEvent) {
  if(keyMap.has(e.key)) {
    keyMap.get(e.key)?.(e)
  }
}

watch(() => props.modelValue, () => {
  setSelected()
})
watch(() => props.options, (newVal) => {
  filteredOptions.value = newVal ?? []
})
watch(() => childrenOptions.value, (newVal) => {
  setFilteredChilds(newVal)
}, { immediate: true})

onMounted(() => {
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