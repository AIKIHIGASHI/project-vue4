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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loginUserName', 'loginUserWallet', 'error']),
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
</style>