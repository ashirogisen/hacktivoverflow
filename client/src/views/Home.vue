<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div style="border-right: 1px solid rgb(228, 218, 218);" class="col-3">
          <div id="main-sidebar">
            <TopContributors />
            <button @click="toHome()" type="button" class="btn sidebar-btns">Home</button><br><br>
            <button @click="toWatchedTags()" type="button" class="btn sidebar-btns">Watched Tags</button><br><br>
            <button @click="toTags()" type="button" class="btn sidebar-btns">Tags</button><br><br>
            <button @click="toProfile()" type="button" class="btn sidebar-btns">Profile</button><br><br>
            <button @click="toPublicForums()" type="button" class="btn sidebar-btns">Public Forums</button>
            <button @click="toLiveChat()" id="live-chat-btn" type="button" class="btn"><i class="fas fa-sms"></i> Live Chat</button>
          </div>
        </div>
        <div class="col-9">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { config } from '../config'
import TopContributors from '../components/TopContributors'
import LiveChatButton from '../components/LiveChatButton'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    TopContributors,
    LiveChatButton
  },
  methods: {
    toHome () {
      this.$router.push('/')
      this.$store.dispatch('getQuestions')
    },
    toWatchedTags () {
      this.$router.push('/watchedtags')
    },
    toTags () {
      this.$router.push('/tags')
    },
    toProfile () {
      this.$router.push('/profile')
    },
    toPublicForums () {
      this.$router.push('/forums')
    },
    toLiveChat () {
      this.$router.push('/livechat')
    },
    getQuestionByWatchedTags () {
      const token = localStorage.getItem('token')

      axios({
        method: 'get',
        url: `${config.host}/questions/watchedtags`,
        headers: {token}
      })
        .then(({data}) => {
          // console.log(data)
        })
    },
  },
  created () {
    this.getQuestionByWatchedTags()
  }
}
</script>

<style scoped>
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
  margin-bottom: 15px;
}

.sidebar-btns:hover {
  margin-left: 50px;
  background-color: #808e9b;
  color: white;
  font-weight: bold;
}

.ask {
  width: 350px;
  height: 250px;
}

#main-sidebar {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

#ask-question {
  margin-top: 50px;
}

#live-chat-btn {
  background-color: #006266;
  color: white;
  font-weight: bold;
  width: 150px;
}
</style>