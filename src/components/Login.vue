<template>
  <div class="container">
    <br>
    <button @click="login" type="button" class="btn btn-success">Login</button>
  </div> <!-- /container -->
</template>

<script>
export default {
  name: 'Login',
  created () {
    let vm = this

    // facebook 初始化
    window.fbAsyncInit = function() {
      FB.init({
        appId: '189181891828196',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
      });
      FB.AppEvents.logPageView();

      // Get FB Login Status
      FB.getLoginStatus(response => {
        console.log(response)
        vm.statusChangeCallback(response)
      })
    };
  },
  methods: {
    login () {
      let vm = this
      FB.login(function (response) {
        vm.statusChangeCallback(response) 
      }, {
        scope: 'email, public_profile',
        return_scopes: true
      })
    },
    getProfile () {
      FB.api('/me?fields=name,id,email', function (response) {
        vm.$set(vm.$store, 'profile', response)
      })
    },
    statusChangeCallback (response) {
      console.log(this.$store.authorized)
      if (response.status === 'connected') {
        this.$store.authorized = true
      console.log(this.$store.authorized)
      } else if (response.status === 'not_authorized') {
        this.$store.authorized = false
      console.log(this.$store.authorized)
      } else if (response.status === 'unknown') {
        this.$store.authorized = false
      console.log(this.$store.authorized)
      } else {
        this.$store.authorized = false
      console.log(this.$store.authorized)
      }
    }
  },
    data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
