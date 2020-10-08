<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  components: {
    Header,
    Footer
  },
  created() {
    // ユーザーの確認
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log('ユーザーはいません');
        return;
      }
      console.log(user);
    });
  }
}
</script>

<style lang="scss">
#main {
  margin: 40px;
  text-align: center;
  table {
    margin: 30px auto;
    th {
      text-align: center;
    }
  }
} 
</style>
