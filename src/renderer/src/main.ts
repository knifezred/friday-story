import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'

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

createApp(App).use(vuetify).mount('#app')
