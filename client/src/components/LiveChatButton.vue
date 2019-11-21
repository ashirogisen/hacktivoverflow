<template>
  <div id="live-chat">
    <button @click="toLiveChat()" id="live-chat-btn" type="button" class="btn"><i class="fas fa-sms"></i> Live Chat</button>
  </div>
</template>

<script>
export default {
  name: 'live-chat-btn',
  methods: {
    toLiveChat () {
      this.$router.push('/livechat')
    }
  }
}
</script>

<style>
#live-chat-btn {
  background-color: #006266;
  color: white;
  font-weight: bold;
  width: 150px;
}
</style>