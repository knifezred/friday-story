import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import App from './App.vue'
import { setupNProgress } from './plugins/nprogress'
import { setupRouter } from './router'
import { setupStore } from './store'

const app = createApp(App)

setupNProgress()

setupStore(app)

await setupRouter(app)

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  components,
  directives
})

app.use(vuetify).mount('#app')
