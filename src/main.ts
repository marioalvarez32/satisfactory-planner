import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import './assets/css/app.scss'
import { vuetify } from './vuetify'

const pinia = createPinia()
const app = createApp(App)

// Plugins
app.use(router)
app.use(pinia)
app.use(vuetify)

void app.mount('#app')
