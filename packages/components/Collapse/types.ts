import type { Ref } from 'vue'
export type CollapseItemName = string | number

//modelValue: 控制当前打开的item，非手风琴模式下可以有多个
export interface CollapseProps {
  modelValue: CollapseItemName[]
  accordion?: boolean
}

//name: collapse-item的一个唯一标识； title: 标题； disabled: 是否被禁用
export interface CollapseItemProps {
  name: CollapseItemName
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>
  handleItemClick(name: CollapseItemName): void
}

//change:每次点击触发； update: modelValue: 更新modelValue
export interface CollapseEmits {
  (e: 'update:modelValue', value: CollapseItemName[]): void
  (e: 'change', value: CollapseItemName[]): void
}
