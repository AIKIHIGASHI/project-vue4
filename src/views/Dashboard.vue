<template>
  <div>
    <div id="main">
      <div class="info">
        <div>
          {{ loginUserName }}さんようこそ！
        </div>
        <div>
          残高：{{ loginUserWallet }}
          <button class="button is-small is-info is-outlined">ログアウト</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loginUserName', 'loginUserWallet']),
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