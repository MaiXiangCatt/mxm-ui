import { computed, getCurrentInstance } from 'vue'
import type { ComputedRef } from 'vue'

export default function useProps<T>(propName: string): ComputedRef<T> {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useProp must be called within a component')
  }
  return computed(() => (instance?.proxy?.$props as any)?.[propName] as T)
}
