import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue';

import '@/assets/styles/index.scss'
import App from '@/App.vue'
import router from '@/router'
import plugins from './plugins'

const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(plugins)

app.mount('#app')
