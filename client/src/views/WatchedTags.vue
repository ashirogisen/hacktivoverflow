<template>
  <div id="watched-tags">
    <center>
      <div v-for="(question, index) in watchedTagsQuestion" :key="index" style="margin-bottom:10px;" class="card w-75">
        <div class="card-body">
          <h5 class="card-title">{{question.title}}</h5>
          <div id="card-question">
            <span style="width: 60px; margin-bottom: 10px;" class="badge badge-warning">View: {{question.views}}</span>
            <div v-for="(tag, index) in question.tag" :key="index" id="tags">
              <span @click="getQuestionsByTag(tag.id)" style="margin-right: 5px; margin-bottom: 10px;" id="tag-badge" class="badge badge-info">{{tag.name}}</span>
            </div>
            <button @click="toDetails(question._id)" type="button" class="btn details-btn">Details</button>
            <div id="writer">
              <span class="badge bd-writer">{{question.user.name}}</span>
            </div>
          </div>
        </div>
      </div>
      </center> 
  </div>
</template>

<script>
import axios from 'axios'
import { config } from '../config'

export default {
  name: 'watchedtags',
  data () {
    return {
      watchedTagsQuestion: null
    }
  },
  methods: {
    getQuestionsByWatchedTags () {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${config.host}/questions/watchedtags`,
        headers: {token}
      })
        .then(({data}) => {
          this.watchedTagsQuestion = data
        })
    },
    toDetails (id) {
      const token = localStorage.getItem('token')
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first'
        })
      } else {
        axios({
          method: 'patch',
          url: `${config.host}/questions/views/${id}`
        })
          .then(({data}) => {
            // console.log(data)
          })
          .catch(console.log)
        this.$store.dispatch('getQuestionDetails', id)
      }
    }
  },
  created () {
    this.getQuestionsByWatchedTags()
  }

}
</script>

<style>
#tag-badge {
  cursor: pointer;
}

#current-tag-text {
  display: flex;
  justify-content: flex-start;
}

#post-question {
  background-color: #C9356E;
  color: white;
  font-weight: bold;
  width: 150px;
}

.bd-writer {
  background-color: #C9356E;
  color: white;
  font-weight: bold;
}
#writer {
  margin-left: 450px;
}

#tags {
  display: flex;
  justify-content: center;
  align-items: center;
}

#card-question {
  display: flex;
  flex-direction: column;
  width: 200px;
  justify-content: center;
  align-items: center;
}

.details-btn {
  background-color: #0087BE;
  color: white;
  font-weight: bold;
}

.details-btn:hover {
  background-color: #0087BE;
  color: white;
  font-weight: bold;
}

#ask-btn {
  background-color: #C9356E;
  color: white;
  font-weight: bold;
}

.sidebar-btns {
  border: 1px solid #d2dae2;
  width: 150px;
  color: rgb(112, 108, 108);
  transition: all 0.5s ease-in-out;
}

.sidebar-btns:hover {
  margin-left: 50px;
  background-color: #626970;
  color: white;
  font-weight: bold;
}

.ask {
  width: 350px;
  height: 250px;
}

#watched-tags {
  margin-top: 50px;
}

.tags-2 {
  display: flex;
}

#tag-name {
  width: 120px;
  height: 38px;
  border: 1px solid black;
  border-radius: 3px;
  margin-right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>