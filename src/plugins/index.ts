import type { App } from 'vue'

import pinia from './pinia'
import toast from './toast'
import globalComponents from './globalComponents'
// import Comment from '../views/Home/_components/Comment/Comment.vue'
import onOutsideClickDirective from './onOutsideClick'
import './axios-config'

export default {
  install(app: App) {
    // app.component('Comment', Comment)
    app.use(pinia)
    app.use(globalComponents)
    app.use(onOutsideClickDirective)
    app.use(toast)
  }
}
