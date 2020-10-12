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
    errorMessage(state, error) {
      state.error = error;
    } 
  },
  actions: {
    signUp({ commit }, {userName, email, password}) {
      let error = '';
      if (!userName) {
        error = 'The userName is blank';
        commit('errorMessage', error);
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({displayName: userName});
      })
      .catch(error => {
        commit('errorMessage', error);
      });
    }
  }
})
