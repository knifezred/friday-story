import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins'
import './plugins/assets'
import { setupRouter } from './router'
import { setupStore } from './store'
import { localStg } from './utils/storage'

async function setupApp() {
  setupLoading()

  setupNProgress()

  setupIconifyOffline()

  setupDayjs()

  const app = createApp(App)

  // 取消登录
  localStg.remove('token')

  setupStore(app)

  await setupRouter(app)

  setupI18n(app)

  app.mount('#app')
}

setupApp()
