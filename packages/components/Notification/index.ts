import Notification from './methods'
import { withInstallFunction } from "@mxm-ui/utils";

export const MxmNotification = withInstallFunction(Notification, '$notification')

export * from './types'