<template>
  <HelloWorld msg="Welcome to Wallet Application"/>
  <!-- <div v-if="showWallet">
    <router-link to="/wallet">Go to Wallet</router-link>
  </div> -->
  
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    // WalletSubmit,
  },
  data() {
    return {
      showWallet: true,
    };
  },
  computed: {

  },
  created() {
    if(this.$route.path.includes('wallet')) {
      this.showWallet = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
