<template>
  <div id="forum-details">
    <center>
      <div id="fd-header" class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">
          <button @click="deleteForum(forumData._id)" id="fd-delete-btn" type="button" class="btn">Delete</button>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{forumData.name}}</h5>
          <p class="card-text">{{forumData.description}}</p>
        </div>
      </div>
      <div id="forum-posts">
        <div v-for="(post, index) in forumPosts" :key="index" class="card w-75" style="margin-bottom: 15px;">
          <div class="card-body post-card-body">
            <span style="margin-bottom: 15px;" class="badge postuser-badge">{{post.user}}</span>
            <p class="card-text" v-html="post.post"></p>
          </div>
        </div>
      </div>
     </center>
    <div id="post-container">
      <h4> Add a new post </h4><br>
      <vue-editor v-model="createdPost"></vue-editor><br>
      <button @click="addPost(forumData._id)" id="post-forum" type="button" class="btn">Post</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { config } from '../config'
import { VueEditor } from 'vue2-editor';

export default {
  name: 'forumdetails',
  data () {
    return {
      createdPost: '',
      forumPosts: []
    }
  },
  components: {
    VueEditor
  },
  computed: {
    forumData () {
      return this.$store.state.forumDetails
    }
  },
  methods: {
    deleteForum (id) {
      const userId = localStorage.getItem('id')
      if (this.forumData.master._id == userId) {
        axios({
        method: 'delete',
        url: `${config.host}/forums/${id}`
      })
        .then(({data}) => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                this.$router.push('/forums')
                Swal.fire(
                'Deleted!',
                'Your forum has been deleted.',
                'success'
                )
            }
          })
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Not Authorized, youre not the forum master'
        })
      }
    },
    getForumDetails () {
      this.$store.dispatch('getForumDetails')
    },
    addPost (id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `${config.host}/forums/${id}`,
        headers: {token},
        data: {
          post: this.createdPost
        }
      })
        .then(({data}) => {
          Swal.fire(
            'New post is created!',
            `Success`,
            'success'
          )
          this.createdPost = ''
          this.getPostsFromForum()
        })
    },
    getPostsFromForum () {
      axios({
        method: 'get',
        url: `${config.host}/forums/${this.forumData._id}`
      })
        .then(({data}) => {
          this.forumPosts = data.post
        })
        .catch(console.log)
    }
  },
  created() {
    this.getPostsFromForum()
  }
}
</script>

<style>
#forum-details {
  margin-top: 30px;
}

#post-forum {
  background-color: #C9356E;
  color: white;
  font-weight: bold;
  width: 190px !important;
}

#post-container {
  margin-top: 50px;
  margin-bottom: 50px;
}

.post-card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.postuser-badge {
  background-color: #218c74;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

#fd-delete-btn, #fd-delete-btn:hover {
  background-color: #b71540;
  color: white;
  font-weight: bold;
}
</style>