<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
main {
  margin-top: 55px;
}
body {
  min-height: 100vh;
  position: relative;
  margin: 0;
}
* {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
