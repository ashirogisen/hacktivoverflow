<template>
  <div id="navbar">
    <nav id="main-navbar" class="navbar navbar-light bg-light">
      <div id="title-logo">
        <a @click="toHome()" class="navbar-brand"> HacktivOverdrive &nbsp;<img src="https://i.imgur.com/yAiIIJV.png" alt="" id="nav-logo"></a>
      </div>
      <button v-if="isLogin" @click="logout()" type="button" style="margin-left: 650px; display:flex; justify-content:center; align-items:center;" class="btn navbar-btns"><i style="margin-right: 7px;" class="fas fa-power-off"></i> Logout</button>
      <div id="log-reg">
        <button v-if="!isLogin" data-toggle="modal" data-target="#loginModal" type="button" style="margin-right: 10px; margin-left: 600px;" class="btn navbar-btns">Login</button>
        <button v-if="!isLogin" data-toggle="modal" data-target="#registerModal" type="button" class="btn navbar-btns">Register</button>
      </div>
      <LoginModal />
      <RegisterModal />
    </nav>
  </div>
</template>

<script>
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'
import Swal from 'sweetalert2'

export default {
  name: 'navbar',
  components: {
    LoginModal,
    RegisterModal
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    checktoken () {
      this.$store.dispatch('checktoken')
    },
    logout () {
      Swal.fire(
        'Logged out!',
        `Thank you!`,
        'success'
      )
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.checktoken()
    }
  },
  created () {
    this.checktoken()
  }
}
</script>

<style scoped>
.navbar-brand {
  cursor: pointer;
}

#nav-logo {
  width: 32px;
  height: 40px;
  margin-right: 200px;
}

#search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
}

#search-btn {
  background-color: #C9356E;
  color: white;
  font-weight: bold;
}

.navbar-btns {
  background-color: #227093;
  color: white;
  font-weight: bold;
}

#main-navbar {
  border-top: 4px solid #f6b93b;
  background-color: #FAFAFB;
}

.btn {
  margin-right: 10px !important;
}

</style>