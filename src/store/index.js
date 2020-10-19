import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: {},
    loginUserStatus: {},
    error: ''
  },
  getters: {
    loginUserName: state => state.loginUserStatus.name,
    loginUserWallet: state => state.loginUserStatus.wallet,
    error: state => state.error
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    getUsers(state, users) {
      // ログイン中のuidでusersコレクション内からそのuidと一致するものを抽出し、ログイン中ユーザのdocをstate.loginUserStatusに入れる
      state.loginUserStatus = users.find(({ uid }) => uid === state.loginUser.uid);
    },
    deleteLoginUser(state) {
      state.loginUser = {};
      state.loginUserStatus = {};
    },
    errorMessage(state, error) {
      state.error = error;
    } 
  },
  actions: {
    signUp({ commit, dispatch }, { userName, email, password }) {
      if (!userName) {
        commit('errorMessage', 'The userName is blank');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({ displayName: userName })
        .then(async () => {
          dispatch('addUser', userName);
          await dispatch('getUsers', userName);
          commit('errorMessage', '');
          router.push({ name: 'dashboard'});
        })
        .catch(error => {
          commit('errorMessage', error);
        });
      })
      .catch(error => {
        commit('errorMessage', error);
      });
    },
    // 現在ログインしているユーザの監視。ユーザがいればstate.loginUserにユーザの情報を入れる
    setLoginUser({ dispatch, commit }) {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            return;
          }
          commit('setLoginUser', user);
          await dispatch('getUsers');
          resolve();
        });
      });
    },
     // サインアップ時にfirestoreにusersコレクションを作成。ドキュメントにそのユーザのuidを持たせる
    addUser({ state }, userName) {
      const db = firebase.firestore();
      const collection = db.collection('users').doc(state.loginUser.uid);
      collection.set({
        uid: state.loginUser.uid,
        name: userName,
        wallet: 500
      })
    },
    // firestoreのusersコレクションを取得
    getUsers({ commit }) {
      return new Promise (resolve => {
        const db = firebase.firestore();
        const collection = db.collection('users');
        const users = [];
        collection.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            users.push(doc.data());
          });
          commit('getUsers', users);
          resolve();
        })
        .catch(error => {
          commit('errorMessage', error);
        });
      });
    },
    login({ commit }, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        commit('errorMessage', '');
        router.push({ name: 'dashboard'});
      })
      .catch(error => {
        commit('errorMessage', error);
      });
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut()
      .then(() => {
        dispatch('deleteLoginUser');
        commit('errorMessage', '');
        router.push({ name: 'login'});
      })
      .catch(error => {
        commit('errorMessage', error);
      });
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser');
    },
  }
})
