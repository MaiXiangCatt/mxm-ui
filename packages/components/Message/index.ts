import Message from './methods'
import { withInstallFunction } from '@mxm-ui/utils'

export const MxmMessage = withInstallFunction(Message, '$message')

export * from './types'
