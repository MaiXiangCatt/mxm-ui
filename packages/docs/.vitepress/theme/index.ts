import DefaultTheme from "vitepress/theme";
import type { App } from "vue"
import MxmUi from "mxm-ui"
import { ElementPlusContainer } from '@vitepress-demo-preview/component'

import '@vitepress-demo-preview/component/dist/style.css'
import "mxm-ui/dist/index.css"
import "./custom.css"

export default {
  ...DefaultTheme,
  enhanceApp({ app }: {app: App}) {
    app.component("demo-preview", ElementPlusContainer)
    app.use(MxmUi)
  }
}