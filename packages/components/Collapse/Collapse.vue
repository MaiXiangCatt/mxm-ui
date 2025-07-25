<template>
  <div class="mxm-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types'
import { ref, provide, watch, watchEffect } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants'
import { debugWarn } from '@mxm-ui/utils'

const COMP_NAME = 'MxmCollapse' as const

defineOptions({
  name: COMP_NAME,
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

//我们维护一个可变的响应式数组，里面存放item的name，代表当前打开的items。点击某个item的时候，看它是否在数组中，进行添加或者删除;
const activeNames = ref(props.modelValue)

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, 'accordion mode should only have one active item')
  }
})

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]
    updateActiveNames(_activeNames)
    return
  }

  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames
  emits('update:modelValue', newNames)
  emits('change', newNames)
}

//这里之所以要用一个watch来侦听modelValue，是因为用户可能在使用组件的时候异步改变modelValue的值，如果没有watch那我们只会在刚开始拿一次modelValue;
watch(
  () => props.modelValue,
  (newNames) => {
    updateActiveNames(newNames)
  }
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
})
</script>

<style scoped>
@import './style.css';
</style>
