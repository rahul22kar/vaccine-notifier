import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import storeConfig from './store/storeConfig'

const store = createStore(storeConfig)

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .mount('#app')
