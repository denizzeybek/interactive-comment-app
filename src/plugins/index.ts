import type { App } from 'vue'

import pinia from './pinia'
import toast from './toast'
import globalComponents from './globalComponents'
import onOutsideClickDirective from './onOutsideClick'

export default {
  install(app: App) {
    app.use(pinia)
    app.use(globalComponents)
    app.use(onOutsideClickDirective)
    app.use(toast)
  }
}
