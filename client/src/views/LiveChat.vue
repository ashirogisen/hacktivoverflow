<template>
  <div id='live-chat'>
    <div id="top" class="border">
      <div class="header border-bottom">
        <div id="lc-title">
          <h4>HacktivOverdrive</h4>
        </div>
      </div>
      <div id="message" class='border'>
          <div v-for="(chat, index) in chatsData" :key="index" style="margin-bottom: 15px;" class="card w-75">
            <div class="card-body">
              <h5 style="color: #b71540" class="card-title">{{chat.user.name}}</h5>
              <p class="card-text">{{chat.message}}</p>
            </div>
          </div>
        </div>
      </div>
    <div id="send-chat" class="border-right border-left border-bottom">
      <form id="btm">
        <div class="inputBox col-10 mt-3">
          <input type="text" v-model="userMessage" id="inpuText" placeholder="Enter message. . ." style='text-align: center;width: 100%; height: 40px'>
        </div>
          <button @click="sendMessage()" id="lc-send-button" type="button" class="btn"><i class="far fa-paper-plane"></i> Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
import { config } from '../config'

export default {
  name: 'livechat',
  data () {
    return {
      socket: io.connect(`${config.host}`),
      chatsData: [],
      userMessage: ''
    }
  },
  methods: {
    sendMessage () {
      const token = localStorage.getItem('token')

      axios({
        method: 'post',
        url: `${config.host}/chats`,
        headers: {token},
        data: {
          message: this.userMessage
        }
      })
        .then(({data}) => {
          this.socket.emit('sendMessage', data.chat)
          this.userMessage = ''
        })
        .catch(console.log)
    },
    getMessages () {
      axios({
        method: 'get',
        url: `${config.host}/chats`
      })
        .then(({data}) => {
          this.chatsData = data
        })
        .catch(console.log)
    }
  },
  created () {
    this.getMessages()
    this.socket.on('sendMessage', (data) => {
      this.chatsData.unshift(data)
    })
  }
}
</script>

<style>
.card {
  width: 100%
}

.header {
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #F8F9FA;
}

#message {
  padding: 5px;
  height: 67vh;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-bottom: 20px;
}

#top {
  height: 73vh
}

#live-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 83vh;
  margin: 30px;
}

.inputBox{
  display: flex;
  justify-content: center;
  align-items: center;
}

#btm {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 763px;
  height:  90px;
  padding-top: 30px;
}

.btnsend {
  display: flex;
  justify-content: center
}

#lc-title {
  background-color: #006266;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  margin-bottom: 0px;
}

#lc-send-button {
  background-color: #b71540;
  color: white;
  font-weight: bold;
  height: 40px;
  margin-top: 10px;
  margin-right: 18px;
}
</style>