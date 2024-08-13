<template>
  <div class="bg-purple" />
  <HelloWorld msg="Welcome to Code Generation Application" />

  <router-view />
  <div class="bg-purple-bottom" />
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
    if (this.$route.path.includes('wallet')) {
      this.showWallet = false;
    }
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
}
.bg-purple {
  background: rgb(127, 24, 127);
  height: 60px;
  right: 0;
  left: 0;
}
.bg-purple-bottom {
  background: rgb(127, 24, 127);
  height: 60px;
  bottom: 0px;
  position: absolute;
  width: 100%;
  right: 0;
  left: 0;
}
</style>
