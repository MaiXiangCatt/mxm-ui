import Form from './Form.vue'
import FormItem from './FormItem.vue'
import { withInstall } from '@mxm-ui/utils'

export const MxmForm = withInstall(Form)
export const MxmFormItem = withInstall(FormItem)

export * from './types'
export * from './hooks'
