<template>
  <div id="main-tag">
    <div class="card-body cardbody-tag">
      <div id="card-explanation">
        <h5 class="card-title">{{tag.name}}</h5>
        <p class="card-text">{{tag.description}}</p>
      </div>
      <div id="tag-btns" style="margin-top: 15px;">
        <button v-if="!isWatched" @click="addToWatchedTags(tag._id)" type="button" class="btn watch-btn" style="margin-bottom: 10px;"><i class="fas fa-glasses"></i> Watch</button>
        <button id="unwatch-btn" v-if="isWatched" @click="removeFromWatchedTags(tag._id)" type="button" class="btn watch-btn" style="margin-bottom: 10px;"><i class="fas fa-glasses"></i> Unwatch</button>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

import { config } from '../config'
export default {
  name: 'tag',
  props: ['tag'],
  data () {
    return {
      isWatched: false,
      userWatchedTags: null
    }
  },
  methods: {
    watchedTagsValidation () {
      const token = localStorage.getItem('token')
      axios ({
        method: 'get',
        url: `${config.host}/`,
        headers: {token}
      })
        .then(({data}) => {
          this.userWatchedTags = data.watchedTag
          for (let i = 0; i < this.userWatchedTags.length; i++) {
            if (this.tag._id == this.userWatchedTags[i]) {
              this.isWatched = true
            }
          }
        })
    },
    addToWatchedTags (id) {
      const token = localStorage.getItem('token')
      if (token) {
        axios({
        method: 'patch',
        url: `${config.host}/addtag/${id}`,
        headers: {token}
      })
        .then(({data}) => {
          Swal.fire(
            'Added to your watched tags!',
            `Success`,
            'success'
          )
          this.getTags()
          this.isWatched = true
        })
        .catch(console.log)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first'
        })
      }
    },
    removeFromWatchedTags (id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `${config.host}/removetag/${id}`,
        headers: {token}
      })
        .then(({data}) => {
          Swal.fire(
            'Removed from your watched tags!',
            `Success`,
            'success'
          )
          this.isWatched = false
          this.getTags()
        })
    },
    getTags () {
      this.$store.dispatch('getTags')
    }
  },
  created () {
    this.watchedTagsValidation()
  }
}
</script>

<style>
.cardbody-tag {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 550px;
}

.watch-btn, .see-question-btn {
  background-color: #F8EFBA;
  color: black;
  font-weight: bold;
}

#unwatch-btn {
  background-color: #b71540;
  color: white;
  font-weight: bold;
}
</style>