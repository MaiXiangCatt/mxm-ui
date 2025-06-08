import { createApp } from 'vue'
import App from './App.vue'
import MxmUi from 'mxm-ui'

const app = createApp(App)
app.use(MxmUi)
app.mount('#app')
