import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: ''
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    createUser(state, error) {
      state.error = error;
    } 
  },
  actions: {
    createUser({ commit }, {userName, email, password}) {
      let error = '';
      if (!userName) {
        error = 'The userName is blank';
        commit('createUser', error);
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({displayName: userName});
      })
      .catch(error => {
        error = error.message;
        commit('createUser', error);
      });
    }
  }
})
