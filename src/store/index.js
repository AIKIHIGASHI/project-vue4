import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {},
    loginUserStatus: {},
    users: [],
    modal1: false,
    modal2: false,
    receiverIndex: null,
    error: '',
  },
  getters: {
    loginUserName: state => state.loginUserStatus.name,
    loginUid: state => state.loginUserStatus.uid,
    loginUserWallet: state => state.loginUserStatus.wallet,
    users: state => state.users,
    modal1: state => state.modal1,
    modal2: state => state.modal2,
    receiverIndex: state => state.receiverIndex,
    error: state => state.error,
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    getUsers(state, users) {
      state.users = users;
      // ログイン中のuidでusersコレクション内からそのuidと一致するものを抽出し、ログイン中ユーザのdocをstate.loginUserStatusに入れる
      state.loginUserStatus = users.find(({ uid }) => uid === state.loginUser.uid);
    },
    deleteLoginUser(state) {
      state.loginUser = {};
      state.loginUserStatus = {};
    },
    toggleModal1(state) {
      state.modal1 = !state.modal1;
    },
    toggleModal2(state, index) {
      // ログインユーザが自身にウォレットを送れない処理
      if (index && state.loginUserStatus.uid === state.users[index].uid) {
        return;
      }
      state.modal2 = !state.modal2;
      // ウォレット受信者のindexをreceiverIndexに格納
      state.receiverIndex = index;
      state.error = '';
    },
    errorMessage(state, error) {
      state.error = error;
    },
  },
  actions: {
    signUp({ commit, dispatch }, { userName, email, password }) {
      if (!userName) {
        commit('errorMessage', 'The userName is blank');
        return;
      }
      firebase
        .auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
          result.user.updateProfile({ displayName: userName })
            .then(async () => {
              dispatch('addUser', userName);
              await dispatch('getUsers', userName);
              commit('errorMessage', '');
              router.push({ name: 'dashboard' });
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
            if (router.currentRoute.name === 'dashboard') {
              router.push({ name: 'login' });
            }
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
        wallet: 500,
      });
    },
    // firestoreのusersコレクションを取得
    getUsers({ commit }) {
      return new Promise(resolve => {
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
    sendWallet({ getters, commit, dispatch }, { receiver, wallet }) {
      const db = firebase.firestore();
      const collection = db.collection('users');
      if (wallet.match(/[^0-9]+/)) {
        commit('errorMessage', '半角数字にて入力してください');
        return;
      } else if (getters.loginUserWallet - wallet < 0) {
        commit('errorMessage', 'walletが足りません');
        return;
      }
      commit('toggleModal2', getters.receiverIndex);
      return new Promise(resolve => {
        collection
          .doc(getters.loginUid)
          .update({ wallet: getters.loginUserWallet - Number(wallet) })
          .then(() => {
            collection
              .doc(receiver[getters.receiverIndex].uid)
              .update({ wallet: receiver[getters.receiverIndex].wallet + Number(wallet) })
              .then(() => {
                commit('errorMessage', '');
                dispatch('getUsers');
              })
              .catch(error => {
                commit('errorMessage', error);
              });
          })
          .catch(error => {
            commit('errorMessage', error);
          });
        resolve();
      });
    },
    login({ commit }, { email, password }) {
      firebase
        .auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          commit('errorMessage', '');
          router.push({ name: 'dashboard' });
        })
        .catch(error => {
          commit('errorMessage', error);
        });
    },
    logout({ commit, dispatch }) {
      firebase
        .auth().signOut()
        .then(() => {
          dispatch('deleteLoginUser');
          commit('errorMessage', '');
          router.push({ name: 'login' });
        })
        .catch(error => {
          commit('errorMessage', error);
        });
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser');
    },
  },
});
