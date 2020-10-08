<template>
  <div class="home">
    <div id="main">
      <h1 class="is-size-3">新規登録画面</h1>
      <div class="has-text-danger">{{error}}</div>
        <table>
          <tbody>
            <tr>
              <th>ユーザ名</th>
              <td><input type="text" placeholder="userName" v-model="userName"></td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td><input type="email" placeholder="E-mail" v-model="email"></td>
            </tr>
            <tr>
              <th>パスワード</th>
              <td><input type="text" placeholder="Password" v-model="password"></td>
            </tr>
          </tbody>
        </table>
      <button class="button is-info is-outlined" @click='signUp()'>新規登録</button>
      <div><router-link class="has-text-info" to="/">ログインはこちらから</router-link></div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    signUp() {
      if (!this.userName) {
        this.error = 'The userName is blank';
        return;
      }
      this.createUser();
    },
    createUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        result.user.updateProfile({displayName: this.userName});
      })
      .catch(error => {
        this.error = error.message;
      });
    }
  }
}
</script>
