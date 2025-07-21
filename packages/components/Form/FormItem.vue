<template>
  <div
    class="mxm-form-item"
    :class="{
      'is-error': validateStatus === 'error',
      'is-disabled': isDisabled,
      'is-required': isRequired,
      'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
      'asterisk-right': ctx?.requiredAsteriskPosition === 'right',
    }"
  >
    <component
      :is="labelFor ? 'label' : 'div'"
      v-if="hasLabel"
      :id="labelId"
      class="mxm-form-item__label"
      :class="`position-${ctx?.labelPosition ?? 'right'}`"
      :for="labelFor"
    >
      <slot
        name="label"
        :label="currentLabel"
      >
        {{ currentLabel }}
      </slot>
    </component>
    <div class="mxm-form-item__content">
      <slot :validate="validate"></slot>
      <div
        v-if="validateStatus === 'error'"
        class="mxm-form-item__error-msg"
      >
        <template v-if="ctx?.showMessage && showMessage">
          <slot
            name="error"
            :error="errMsg"
            >{{ errMsg }}</slot
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  ref,
  nextTick,
  provide,
} from 'vue'
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from './constans'
import {
  cloneDeep,
  filter,
  get,
  isArray,
  isNil,
  isNumber,
  isString,
  keys,
  size,
} from 'lodash-es'
import Schema, { type RuleItem } from 'async-validator'
import { useId } from '@mxm-ui/hooks'
import type {
  FormItemContext,
  FormValidateFailure,
  FormValidateCallback,
  ValidateStatus,
  FormItemInstance,
  FormItemRule,
} from './types'

defineOptions({
  name: 'MxmFormItem',
})
const props = withDefaults(defineProps<FormItemContext>(), {
  showMessage: true,
  required: void 0,
})

const slots = defineSlots()
const ctx = inject(FORM_CTX_KEY)
const labelId = useId().value

const inputIds = ref<string[]>([])
const validateStatus = ref<ValidateStatus>('init')
const errMsg = ref('')

const hasLabel = computed(() => !!(props.label || slots.label))
const labelFor = computed(
  () => props.for || (inputIds.value.length > 0 ? inputIds.value[0] : '')
)
const currentLabel = computed(
  () => `${props.label ?? ''}${ctx?.labelSuffix ?? ''}`
)
const normalizedLabelWidth = computed(() => {
  const _normalizeStyle = (val: number | string) => {
    if (isNumber(val)) return `${val}px`
    return val.endsWith('px') ? val : `${val}px`
  }

  if (props.labelWidth) return _normalizeStyle(props.labelWidth)
  if (ctx?.labelWidth) return _normalizeStyle(ctx.labelWidth)
  return '150px'
})

const isDisabled = computed(() => ctx?.disabled || props.disabled)
const isRequired = computed(
  () =>
    (!ctx?.hideRequireAsterisk &&
      itemRules.value.some((element) => element.required)) ||
    props?.required
)
const innerValue = computed(() => {
  const model = ctx?.model
  return getValByProp(model)
})
const propString = computed(() => {
  if (!props.prop) return ''
  return isString(props.prop) ? props.prop : props.prop.join('.')
})

const itemRules = computed(() => {
  const required = props.required
  const rules: FormItemRule[] = []
  if (props.rules) {
    rules.push(...props.rules)
  }
  const formRules = ctx?.rules
  if (formRules && props.prop) {
    const _rules = getValByProp(formRules)
    if (_rules) {
      rules.push(..._rules)
    }
  }

  if (!isNil(required)) {
    const requiredRules = filter(
      rules.map((rule, index) => [rule, index]),
      (item: [FormItemRule, number]) => keys(item[0]).includes('required')
    )
    if (size(requiredRules)) {
      for (const item of requiredRules) {
        const [rule, index] = item as [FormItemRule, number]
        if (rule.required === required) continue
        rules[index] = { ...rule, required }
      }
    } else {
      rules.push({ required })
    }
  }
  return rules
})

let initialVal: any = null
let isResetting = false

function getValByProp(target: Record<string, any> | void) {
  if (target && props.prop && !isNil(get(target, props.prop))) {
    return get(target, props.prop)
  }
  return null
}
async function doValidate(rules: RuleItem[]) {
  const modelName = propString.value
  const validator = new Schema({ [modelName]: rules })
  return validator
    .validate({ [modelName]: innerValue.value }, { firstFields: true })
    .then(() => {
      validateStatus.value = 'success'
      ctx?.emits('validate', props, true, '')
      return true
    })
    .catch((err: FormValidateFailure) => {
      const { errors } = err
      validateStatus.value = 'error'
      errMsg.value =
        errors && errors.length > 0 ? (errors[0].message ?? '') : ''
      ctx?.emits('validate', props, false, errMsg.value)
      return Promise.reject(err)
    })
}
function getTriggeredRules(trigger: string) {
  const rules = itemRules.value
  if (!rules) return []

  return filter(rules, (rule) => {
    if (!rule.trigger || !trigger) return true
    if (isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    }
    return rule.trigger === trigger
  }).map(({ trigger, ...rule }) => rule as RuleItem)
  //我们已经用filter根据trigger属性筛选出了符合当前需要的触发条件的规则，至此trigger使命已经结束，所以我们用map把它去掉
}

const validate: FormItemInstance['validate'] = async (
  trigger: string,
  callback?: FormValidateCallback
) => {
  if (isResetting || !props.prop || isDisabled.value) return false
  if (!validateStatus.value) {
    callback?.(false)
    return false
  }

  const rules = getTriggeredRules(trigger)
  //没有任何规则的时候，直接return true
  if (!rules.length) {
    callback?.(true)
    return true
  }
  validateStatus.value = 'validating'
  return doValidate(rules)
    .then(() => {
      callback?.(true)
      return true
    })
    .catch((err: FormValidateFailure) => {
      const fields = err.fields
      callback?.(false, fields)
      return Promise.reject(fields)
    })
}

const resetField: FormItemInstance['resetField'] = () => {
  const model = ctx?.model
  if (model && propString.value && !isNil(get(model, propString.value))) {
    isResetting = true
    model[propString.value] = cloneDeep(initialVal)
  }
  nextTick(() => clearValidate())
}
const clearValidate: FormItemInstance['clearValidate'] = () => {
  validateStatus.value = 'init'
  errMsg.value = ''
  isResetting = false
}
const addInputId: FormItemContext['addInputId'] = (id) => {
  if (!inputIds.value.includes(id)) {
    inputIds.value.push(id)
  }
}
const removeInputId: FormItemContext['removeInputId'] = (id) => {
  inputIds.value = inputIds.value.filter((i) => i !== id)
}

const formItemCtx: FormItemContext = reactive({
  ...toRefs(props),
  disabled: isDisabled.value,
  validate,
  resetField,
  clearValidate,
  addInputId,
  removeInputId,
})

onMounted(() => {
  if (props.prop) {
    ctx?.addField(formItemCtx)
    initialVal = innerValue.value //这一步是为了在reset的时候能重置回一开始保存的值
  }
})

onUnmounted(() => {
  if (props.prop) {
    ctx?.removeField(formItemCtx)
  }
})

provide<FormItemContext>(FORM_ITEM_CTX_KEY, formItemCtx)

defineExpose<FormItemInstance>({
  validateMessage: errMsg,
  validateStatus,
  validate,
  resetField,
  clearValidate,
})
</script>

<style scoped>
@import './style.css';

.mxm-form-item {
  --mxm-form-label-width: v-bind(normalizedLabelWidth) !important
;
}
</style>
