import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/scss/all.scss'
import "bootstrap"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
