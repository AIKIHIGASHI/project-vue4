<template>
  <div>
    <div id="main">
      <div class="has-text-danger">{{ error }}</div>
      <div class="info">
        <div>
          {{ loginUserName }}さんようこそ！
        </div>
        <div>
          残高：{{ loginUserWallet }}
          <button class="button is-small is-info is-outlined" @click="logout()">ログアウト</button>
        </div>
      </div>
      <h1 class="is-size-3">ユーザ一覧</h1>
      <table>
        <thead>
          <tr>
            <th class="user">ユーザ名</th>
          </tr>
        </thead >
        <tbody v-for="user in users" :key="user.id">
          <tr >
            <td>{{ user.name }}</td>
            <td><button class="button is-success is-small">walletをみる</button></td>
            <td><button class="button is-success is-small">送る</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loginUserName', 'loginUserWallet', 'users', 'error']),
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 500px;
}
.user {
  padding-right: 200px;
  text-align: center;
}
.is-success {
margin: 1px 2px;
font-weight: bold;
}
</style>