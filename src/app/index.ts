import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { piniaPluginLocalStorage } from './../plugins/pinia-local-storage'
import App from './App.vue'
import { router }from './providers'
// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './index.css'

const pinia = createPinia()
pinia.use(piniaPluginLocalStorage)

const vuetify = createVuetify({
    components,
    directives,
  })

export const app = createApp(App).use(pinia).use(vuetify).use(router)