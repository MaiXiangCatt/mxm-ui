import { computed, ref } from "vue";

const zIndex = ref(0)

export default function useZindex(initVal = 2000) {
  const initValRef = ref(initVal)
  const currentZIndex = computed(() => zIndex.value + initValRef.value)

  const nextZindex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialValue: initValRef,
    currentZIndex,
    nextZindex
  }
}