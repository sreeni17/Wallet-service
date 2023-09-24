<template>
  <HelloWorld msg="Welcome to Wallet Application"/>
  <router-link to="/wallet">Go to Wallet</router-link>
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// import WalletSubmit from './components/WalletSubmit.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    // WalletSubmit,
  },
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
