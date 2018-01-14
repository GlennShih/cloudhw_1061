<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Blog</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li v-if="$store.authorized" class="nav-item active">
          <router-link class="nav-link" to="/blog">blog</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav">
        <img v-if="profile" v-show="this.profile.name" :src="profilePicture" alt="profile" class="profile-picture"/>
        <li v-if="!($store.authorized)"  class="nav-item active">
           <button class="btn btn-outline-success" @click="login"><i class="fa fa-user" aria-hidden="true"></i> 登入</button>
        </li>
        <li v-else class="nav-item active">
           <button class="btn btn-outline-danger" @click="logout"><i class="fa fa-user" aria-hidden="true"></i> 登出</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
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
      let vm=this
      FB.login(function (response) {
        vm.statusChangeCallback(response) 
      }, {
        scope: 'email, public_profile',
        return_scopes: true
      })
    },
    logout () {
      let vm = this

      FB.logout(function (response) {
        vm.statusChangeCallback(response)
      });
      this.$router.push("/")
    },
    getProfile () {
      let vm = this

      FB.api('/me?fields=name,id,email', function (response) {
        vm.$set(vm, 'profile', response)
      })
    },
    statusChangeCallback (response) {
      console.log(this.$store.authorized)
      if (response.status === 'connected') {
        this.$store.authorized = true
        this.getProfile()
      console.log(this.$store.authorized)
      } else if (response.status === 'not_authorized') {
        this.$store.authorized = false
        this.profile=null
      console.log(this.$store.authorized)
      } else if (response.status === 'unknown') {
        this.$store.authorized = false
        this.profile=null
      console.log(this.$store.authorized)
      } else {
        this.$store.authorized = false
        this.profile=null
        console.log(this.$store.authorized)
      }
    }
  },
  computed:{
      profilePicture () {
        return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?width=30` : `null`
      }
    },
  data () {
    return {
      profile:null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
  text-align:left;
}
.nav-link {
  border-bottom: 1px solid #292b2c;
}
.nav-link:hover {
  border-bottom: 1px solid #ffffff;
}
a:not([href]):not([tabindex]) {
  color: #fff;
}
.profile-picture {
  width: 30px;
  border-radius: 15px;
}
</style>
