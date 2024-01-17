import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})
// SET PAGE TITLE
const DEFAULT_TITLE = 'Vue3'
router.afterEach((to) => {
  nextTick(() => {
    document.title = typeof to.meta.title === 'string' ? `${to.meta.title}` : DEFAULT_TITLE
  })
})

export default router
