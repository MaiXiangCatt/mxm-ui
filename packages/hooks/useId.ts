import { computed } from 'vue'
import type { Ref } from 'vue'

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
}

export function useId(namespace: string = 'mxm'): Ref<string> {
  const idRef = computed(() => {
    return `${namespace}-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`
  })
  return idRef
}

export default useId
