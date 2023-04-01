import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster';

import './assets/main.css'
// createApp(App).use(Toaster).mount('#app')
const app = createApp(App)

app.use(router)
app.use(Toaster)
app.mount('#app')
