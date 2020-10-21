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
        <tbody v-for="(user, index) in users" :key="user.id">
          <tr >
            <td>{{ user.name }}</td>
            <td><button class="button is-success is-small" @click="checkWallet(index)">walletをみる</button></td>
            <td><button class="button is-success is-small">送る</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal" :class="{'is-active': modal1}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="window">
          <div v-text="displayName"></div>
          <div class="wallet" v-text="wallet1"></div>
        </div>
        <div class="button-space">
          <button class="button is-danger is-small is-size-6 " @click="toggleModal1()">close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      wallet1: null,
      displayName: ''
    }
  },
  computed: {
    ...mapGetters(['loginUserName', 'loginUserWallet', 'users', 'modal1', 'error']),
  },
  methods: {
    ...mapMutations(['toggleModal1']),
    ...mapActions(['logout']),
    checkWallet(index) { 
      this.toggleModal1();
      this.displayName = this.users[index].name + 'さんの残高';
      this.wallet1 = this.users[index].wallet;
    },
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
.window {
  width: 200px;
  margin: 200px auto 0;
  padding: 10px;
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  padding-top: 10px;
  .wallet {
    margin: 20px 0 10px;
  }
}
.button-space {
  width: 200px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-left: 120px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(209, 209, 209);
  .is-danger {
    font-weight: bold;
    border-radius: 4px;
    padding: 0;
    height: 30px;
    width: 60px;
  }
}
</style>