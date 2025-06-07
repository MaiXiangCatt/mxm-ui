import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MxmUi from 'mxm-ui'

const app = createApp(App)
app.use(MxmUi)
app.mount('#app')
