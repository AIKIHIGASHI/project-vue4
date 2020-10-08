import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyC0M6c3UL8wORLCYOEEH9U47HeN057feQ0',
  authDomain: 'project-vue4.firebaseapp.com',
  databaseURL: 'https://project-vue4.firebaseio.com',
  projectId: 'project-vue4',
  storageBucket: 'project-vue4.appspot.com',
  messagingSenderId: '316057063276',
  appId: '1:316057063276:web:19028f49b5627aef2c6d49',
  measurementId: 'G-G94WGWH9GV'
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
