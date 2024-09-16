<template>
  <div class="bg-purple">
    <img src="./assets/wayfair.png" class="image1">
    <h2 class="wayfair-header">
      Wayfair
    </h2>
  </div>

  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/hire' }">
      Homepage
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/resume-upload' }">
      Resumes
    </el-breadcrumb-item>
    <el-breadcrumb-item>Reports</el-breadcrumb-item>
  </el-breadcrumb>
  <HelloWorld msg="Welcome to RESUME-GENIEus" />

  <router-view />
  <div class="bg-purple-bottom" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Logo from './assets/logo.png';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      showWallet: true,
      Logo,
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
.image1 {
  width:50px;
  height:60px;
  left: 10px;
  position: absolute;
}
.wayfair-header {
  color: white;
  left: 70px;
  font-size:xx-large;
  position: absolute;
  top: 0px;
}
.breadcrumb {
  margin: 20px 0 0 0;
  font-size: xx-large;
  font-weight: 200;
}
</style>
