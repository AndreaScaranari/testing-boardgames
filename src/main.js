import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShield, faKhanda, faMinus, faPlus, faX, faSkull, faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShield, faKhanda, faMinus, faPlus, faX, faSkull, faBolt)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
