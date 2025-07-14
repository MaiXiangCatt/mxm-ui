import type { Ref, ComputedRef } from "vue"
import type { SelectOptionProps, SelectStates } from "./types";


interface KeyMapParams {
  isDropdownVisible: Ref<boolean>;
  highlightedLine: ComputedRef<SelectOptionProps|void>;
  hasData: ComputedRef<boolean>;
  lastIndex: ComputedRef<number>;
  selectStates: SelectStates;
  controlVisible: (visible: boolean) => void;
  handleSelect: (option: SelectOptionProps) => void;
}

export default function useKeyMap({
  isDropdownVisible,
  highlightedLine,
  hasData,
  lastIndex,
  selectStates,
  controlVisible,
  handleSelect
}: KeyMapParams) {
  const keyMap = new Map<string, Function>()

  keyMap.set('Enter', () => {
    if(isDropdownVisible.value) {
      if(selectStates.highlightedIndex >=0 && highlightedLine.value) {
        handleSelect(highlightedLine.value as SelectOptionProps)
      } else {
        controlVisible(false)
      }
    } else {
      controlVisible(true)
    }
  })
  
  keyMap.set('Escape', () => {
    if(isDropdownVisible.value) {
      controlVisible(false)
    }
  })

  keyMap.set('ArrowUp', (e: KeyboardEvent) => {
    e.preventDefault()
    if(!hasData.value) return;
    if(selectStates.highlightedIndex === -1 || selectStates.highlightedIndex === 0) {
      selectStates.highlightedIndex = lastIndex.value
      return
    }
    selectStates.highlightedIndex--
  })

  keyMap.set('ArrowDown', (e: KeyboardEvent) => {
    e.preventDefault()
    if(!hasData.value) return;
    if(selectStates.highlightedIndex === -1 || selectStates.highlightedIndex === lastIndex.value) {
      selectStates.highlightedIndex = 0
      return
    }
    selectStates.highlightedIndex++
  })

  return keyMap
}