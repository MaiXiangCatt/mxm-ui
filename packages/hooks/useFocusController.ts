import { getCurrentInstance, ref, type Ref } from "vue";
import { isFunction } from "lodash-es";
import useEventListener from "./useEventListener";

interface UseFocusControllerOptions {
  afterFocus?: () => void;
  beforeBlur?: (e: FocusEvent) => boolean | void;
  afterBlur?: () => void;
}

//这个hook的作用：1.通过isFocused管理焦点状态；2.扩展组件的点击区域，即让用户点击外层div时也能聚焦到输入框）；3.提供聚焦/失焦前的钩子函数
export function useFocusController<T extends HTMLElement | { focus: () => void}>(
  target: Ref<T | void>,
  { afterFocus, beforeBlur, afterBlur}: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()
  const emit = instance!.emit
  const wrapperRef = ref<HTMLElement>()
  const isFocused = ref(false)

  const handlerFocus = (event: FocusEvent) => {
    if(isFocused.value === true) return; //如果已经聚焦，直接返回
    isFocused.value = true  //聚焦状态设为true
    emit('focus', event)  //发射focus事件
    afterFocus?.()  //调用afterFocus钩子
  }

  const handlerBlur = (event: FocusEvent) => {
    //在beforeBlur前执行一次，如果返回true就不会执行失焦
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false
    //event.relatedTarget指向因为本次失焦事件而即将获得焦点的下一个元素，这里我们判断下一个要聚焦的元素是不是还属于我这个组件内部的一部分，是的话就阻止失焦。
    if(cancelBlur || (event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget as Node))) return;
    isFocused.value = false
    emit('blur', event)
    afterBlur?.()
  }

  //扩展点击区域，我们给外层wrapper绑定一个点击事件，以让真正的input能获得焦点
  const handlerClick = () => {
    target.value?.focus()
  }

  useEventListener(wrapperRef, 'click', handlerClick)

  return {
    wrapperRef,
    isFocused,
    handlerFocus,
    handlerBlur
  }
}

export default useFocusController