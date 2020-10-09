<template>
  <div class="home">
    <div id="main">
      <h1 class="is-size-3">新規登録画面</h1>
      <div class="has-text-danger">{{ error }}</div>
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
      <button class="button is-info is-outlined" @click="signUp()">新規登録</button>
      <div><router-link class="has-text-info" to="/">ログインはこちらから</router-link></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions(['createUser']),
    signUp() {
      this.createUser({
        userName: this.userName, 
        email: this.email, 
        password: this.password
      });
    }
  }
}
</script>
