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
import { mapActions} from 'vuex'
export default {
  components: {
    Header,
    Footer
  },
  async created() {
    await this.setLoginUser();
  },
  methods: {
    ...mapActions(['setLoginUser'])
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
