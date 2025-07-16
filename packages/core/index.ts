import { makeInstaller } from '@mxm-ui/utils'
import components from './components'
import '@mxm-ui/theme/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const installer = makeInstaller(components)
library.add(fas)

export * from '@mxm-ui/components'
export default installer
