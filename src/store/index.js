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
    signUp({ commit }, { userName, email, password }) {
      let error = '';
      if (!userName) {
        error = 'The userName is blank';
        commit('errorMessage', error);
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({displayName: userName});
        error = '';
        commit('errorMessage', error);
      })
      .catch(error => {
        commit('errorMessage', error);
      });
    },
    login({ commit }, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // 確認用
        console.log('ログイン成功しました');
        let error = '';
        commit('errorMessage', error);
      })
      .catch(error => {
        commit('errorMessage', error);
      });
    },
  }
})
