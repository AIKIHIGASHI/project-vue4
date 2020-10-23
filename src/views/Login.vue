<template>
  <div>
    <div id="main">
      <h1 class="is-size-3">ログイン画面</h1>
      <div class="has-text-danger">{{ error }}</div>
      <table>
        <tbody>
          <tr>
            <th>メールアドレス</th>
            <td><input type="email" placeholder="E-mail" v-model="email" /></td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td><input type="text" placeholder="Password" v-model="password" /></td>
          </tr>
        </tbody>
      </table>
      <button class="button is-info is-outlined" @click="login({ email, password })">ログイン</button>
      <div><router-link class="has-text-info" to="/">新規登録はこちらから</router-link></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['error']),
  },
  methods: {
    ...mapActions(['login']),
  },
};
</script>
