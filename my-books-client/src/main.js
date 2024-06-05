import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import i18n from './i118.js'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
