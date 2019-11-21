<template>
  <div id="public-forum">
    <button data-toggle="modal" data-target="#createForum" type="button" class="btn createForum-btn"> Create New Forum</button>
    
    <div id="forum-list">
      <div id="forum-card" v-for="(forum, index) in forumList" :key="index" class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">
          <button @click="toDetailsForum(forum._id)" id="enter-btn" type="button" class="btn">Enter</button>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{forum.name}}</h5>
          <p class="card-text">{{forum.description}}</p>
        </div>
      </div>
    </div>


    <div class="modal fade" id="createForum">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Forum</h5>
            <button class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group d-flex flex-column">
                <label for="description" class="text-left">Name</label>
                <input type="text" class="form-control" id="message" rows="1" v-model="newForum.name">
              </div>
               <div class="form-group d-flex flex-column">
                <label for="description" class="text-left">Description</label>
                <textarea class="form-control" id="message" rows="3" v-model="newForum.description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer ">
            <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="createForum()">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { config } from '../config'

export default {
  name: 'forum',
  data () {
    return {
      forumList: [],
      newForum: {
        name: '',
        description: ''
      },
      postForForum: {
        post: ''
      }
    }
  },
  methods: {
    toDetailsForum (id) {
      const token = localStorage.getItem('token')
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first'
        })
      } else {
        this.$store.dispatch('getForumDetails', id)
      }
    },
    getForums () {
      axios({
        method: 'get',
        url: `${config.host}/forums`
      })
        .then(({data}) => {
          this.forumList = data.reverse()
          console.log(data)
        })
        .catch(console.log)
    },
    createForum () {
      const token = localStorage.getItem('token')
      axios({
        method: 'post',
        url: `${config.host}/forums`,
        headers: {token},
        data: {
          name: this.newForum.name,
          description: this.newForum.description
        }
      })
        .then(({data}) => {
          Swal.fire(
            'New forum is created!',
            `Success`,
            'success'
          )
          this.newForum.name = ''
          this.newForum.description = ''
          this.getForums()
        })
    }
  },
  created() {
    this.getForums()
  }
}
</script>

<style>
#public-forum {
  margin-top: 30px;
}

.createForum-btn, .createForum-btn:hover {
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
  background-color: #C9356E;
}

#enter-btn {
  background-color: #079992;
  color: white;
  font-weight: bold;
}

#forum-list {
  display: flex;
  flex-wrap: wrap;
}

#forum-card {
  width: 220px;
  height: 220px;
  margin: 15px;
}
</style>