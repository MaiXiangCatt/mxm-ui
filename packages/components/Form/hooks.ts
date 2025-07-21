import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from './constans'
import {
  computed,
  inject,
  unref,
  ref,
  type MaybeRef,
  type WatchStopHandle,
  onMounted,
  toRef,
  watch,
  onUnmounted,
} from 'vue'
import { useProps, useId } from '@mxm-ui/hooks'
import type { FormItemContext } from './types'

export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0)
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0)
  return { form, formItem }
}

export function useFormDisabled(fallback?: MaybeRef<boolean | void>) {
  const disabled = useProps<boolean>('disabled')
  const form = inject(FORM_CTX_KEY, void 0)
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0)
  return computed(
    () =>
      disabled.value ||
      unref(fallback) ||
      form?.disabled ||
      formItem?.disabled ||
      false
  )
}

interface UseFormItemInputIdCommonProps extends Record<string, any> {
  id?: string
}

export function useFormItemInputId(
  props: UseFormItemInputIdCommonProps,
  formItemContext?: FormItemContext
) {
  const inputId = ref('')
  let unwatch: WatchStopHandle | void

  onMounted(() => {
    unwatch = watch(
      toRef(() => props.id),
      (id) => {
        const newId = id ?? useId().value
        if (newId !== inputId.value) {
          inputId.value && formItemContext?.removeInputId(inputId.value)
          formItemContext?.addInputId(newId)
          inputId.value = newId
        }
      }
    )
  })

  onUnmounted(() => {
    unwatch && unwatch()
    inputId.value && formItemContext?.removeInputId(inputId.value)
  })

  return {
    inputId,
  }
}
