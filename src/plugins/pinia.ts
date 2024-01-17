import { EStoreNames } from '@/constants/storeNames'
import { createPinia, getActivePinia, type Pinia, type Store } from 'pinia'
import { type App } from 'vue'

interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>
}

// const resetList = [EStoreNames.ADMIN, EStoreNames.AUTH]

export const resetStores = () => {
  const pinia = getActivePinia() as ExtendedPinia
  // pinia._s.forEach((store) => {
  //   if (resetList.includes(store.$id as EStoreNames)) {
  //     store.$reset()
  //   }
  // })
}

export default {
  install(app: App) {
    app.use(createPinia())
  }
}
