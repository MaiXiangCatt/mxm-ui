import { isFunction } from 'lodash-es'
import { defineComponent } from 'vue'

export const typeIconMap = new Map([
  ['info', 'circle-info'],
  ['primary', 'circle-info'],
  ['success', 'check-circle'],
  ['warning', 'circle-exclamation'],
  ['danger', 'circle-xmark'],
  ['error', 'circle-xmark'],
])

export const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object, Function],
      required: true,
    },
  },
  setup(props) {
    return () => (isFunction(props.vNode) ? props.vNode() : props.vNode)
  },
})
export * from './install'
export * from './error'
export * from './style'
