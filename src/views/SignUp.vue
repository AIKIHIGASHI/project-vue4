<template>
  <div class="home">
    <div id="main">
      
        <h1 class="is-size-3">新規登録画面</h1>
        <form>
          <table>
            <tbody>
              <tr>
                <th>ユーザ名</th>
                <td><input type="text" placeholder="userName"></td>
              </tr>
              <tr>
                <th>メールアドレス</th>
                <td><input type="text" placeholder="E-mail"></td>
              </tr>
              <tr>
                <th>パスワード</th>
                <td><input type="text" placeholder="Password"></td>
              </tr>
            </tbody>
          </table>
        </form>
      <span class="button is-info is-outlined">新規登録</span>
      <div><router-link class="has-text-info" to="/">ログインはこちらから</router-link></div>
    </div>
  </div>
</template>
<script>


export default {

}
</script>
