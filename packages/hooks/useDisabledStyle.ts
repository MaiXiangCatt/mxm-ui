import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

const _dfs = (nodes: VNode[], callback: (node: VNode) => void) => {
  each(nodes, (node) => {
    isFunction(callback) && callback(node)
    node.children && _dfs(node.children as VNode[], callback)
  })
}

export function useDisabledStyle() {
  const nodePropsMap = new Map()
  const instance = getCurrentInstance()
  const children = useSlots()?.default?.()

  watchEffect(() => {
    if(!instance?.props.disabled) {
      _dfs(children ?? [], (node) => {
        if(!nodePropsMap.has(node)) return;
        node.props = nodePropsMap.get(node)
      })
      return
    }

    _dfs(children ?? [], (node) => {
      if(!node?.props) return;
      nodePropsMap.set(node, cloneDeep(node.props))
      node.props = assign(node?.props, {
        style: {
          cursor: "not-allowed",
          color: "var(--mxm-text-color-placeholder)"
        }
      })
    })
  })
}

export default useDisabledStyle