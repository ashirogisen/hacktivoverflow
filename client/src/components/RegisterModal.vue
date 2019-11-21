<template>
    <div id="register">
      <!-- Button trigger modal -->
          <!-- Modal -->
          <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                  <div class="column" id="main">
                  <h1 style="font-weight: bold;">Register: </h1> 
                  <hr>
                  <form @submit.prevent="register()">
                      <div class="form-group">
                      <label for="exampleInputName">Name</label>
                      <input v-model="registerData.name" type="name" class="form-control" id="exampleInputName" placeholder="Name">
                      </div>
                      <div class="form-group">
                      <label for="exampleInputEmail1">E-mail </label>
                      <input v-model="registerData.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail">
                      </div>
                      <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input v-model="registerData.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                      </div>
                      <button type="submit" @click="register()" data-dismiss="modal" class="btn btns">Register</button>
                  </form>
                  </div>
                  <div>
                  </div>
                  <div class="column" id="secondary">
                    <div class="sec-content">
                        <img id="ho-img" src="https://i.imgur.com/WZ92qpq.png" alt="">
                        <h2>Already have an account? <p style="margin-top: 8px; font-weight: bold; font-size: 25px;"> Login here:</p></h2>
                        <button type="button" class="btn btns" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">
                        Login
                        </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { config } from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'register-btn',
  data () {
    return {
      registerData: {
          name: '',
          email: '',
          password: ''
      }
    }
  },
  methods: {
    register() {
      axios({
        method: 'post',
        data: {
          name: this.registerData.name,
          email: this.registerData.email,
          password: this.registerData.password
        },
        url: `${config.host}/register`
     })
        .then(({data}) => {
          Swal.fire(
            'Register Success!',
            `Welcome!`,
            'success'
          )
          this.registerData.name = ''
          this.registerData.email = ''
          this.registerData.password = ''
        })
        .catch(console.log)
    }
  }

}
</script>

<style scoped> 
#ho-img {
  width: 260px;
  height: 240px;
  margin-bottom: 50px;
}

#register {
  margin-left: 700px;
}

.btns {
  background-color: #222F3E;
  border: 2px solid white;
  color: white;
  font-weight: bold;
}

.modal-body {
  display: flex;
  padding: 0;
  border-radius: 4rem;
}

.modal-content {
  border-radius: 4rem;
  width: 140%;
  -webkit-box-shadow: -1px -2px 42px -19px rgba(0,0,0,0.74);
  -moz-box-shadow: -1px -2px 42px -19px rgba(0,0,0,0.74);
  box-shadow: -1px -2px 42px -19px rgba(0,0,0,0.74);
}

.modal-content h1, .modal-content h2, .modal-content h3 {
  text-align: center;
}

.modal-content h1 {
  font-size: 1.3em;
  text-transform: uppercase;
}

.modal-content h2 {
  font-size: 1.1em;
}

.modal-content h3 {
  font-size: .8em;
  letter-spacing: 2px;
}

form {
  font-size: .8em;
}

.column {
  flex: 50%;
  padding: 10px;
}

.column#main {
  flex: 75%;
  padding: 50px;
  margin-top: 30px;
  margin-left: 15px;
}

#secondary {
  background-color: #ffeaa7;
  border-radius: 0 4rem 4rem 0;
  text-align: center;
}

#main .form-control {
  border-radius: 0;
  font-size: .9em;
}

.btn {
  text-transform: uppercase;
  border-radius: .15rem;
  width: 150px;
  height: 40px;
  padding: .150rem .75rem;
  margin: 30px auto;
  letter-spacing: 2px;
}

.modal-body label {
  margin-bottom: 0;
}

.sec-content {
  margin-top: 30%;
  color: black;
}
</style>