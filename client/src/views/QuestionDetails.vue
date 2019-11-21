<template>
  <div id="detailsQuestion">
    <button id="back" type="button" class="btn" @click="toHome()"><i style="margin-right: 5px;" class="fas fa-undo-alt"></i> Back</button>
    <div id="currentQuestion">
      <h4 id="title">{{questionDetails.title}}</h4>
      <b-container class="bv-example-row">
        <b-row>
          <b-col id="one" cols="1">
            <center>
              <button class="btn" @click="upvoteQuestion()">
                <img id="up" src="https://image.flaticon.com/icons/png/512/25/25282.png">
              </button>
              <div class="mr-2">{{ questionDetails.upvotes.length }}</div>
              <button class="btn" @click="downvoteQuestion()">
                <img id="down" src="https://i.imgur.com/Xfitx4A.png">
              </button>
            </center>
          </b-col>
          
          <b-col style="margin-top: 10px;" v-html="questionDetails.description" cols="11"></b-col>
          <b-badge id="from" style="margin: 30px;" pill variant="info">From: {{questionDetails.user.name}}</b-badge>
        </b-row>
      </b-container>
    </div>
    
    <div id="answerSection"><br>
      <div v-for="(answer, index) in answersData" :key="index">
        <b-card class="text-left">
          <b-container class="bv-example-row">
            <b-row>
              <b-col id="one" cols="1">
                <center>
                <button class="btn" @click="upvoteAnswer(answer._id)">
                    <img id="up" src="https://image.flaticon.com/icons/png/512/25/25282.png">
                </button>
                <div class="mr-2">{{ answer.upvotes.length }}</div>
                <button class="btn" @click="downvoteAnswer(answer._id)">
                    <img id="down" src="https://i.imgur.com/Xfitx4A.png">
                </button>
                </center>
              </b-col>
              <b-col style="margin-top: 10px;" v-html="answer.description" cols="11"></b-col>
              <div id="user-desc">
                <b-badge id="from" pill variant="warning">From: {{answer.user.name}}</b-badge>
                <TopBadge v-if="answer.user.point > 50" />
              </div>
            </b-row>
          </b-container>
        </b-card><br>
      </div>
      <h4> Add an answer </h4><br>
      <div id="answer-container">
        <vue-editor v-model="createdAnswer"></vue-editor><br>
        <button @click="addAnswer()" id="post-answer" type="button" class="btn">Post Your Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '../config' 
import { VueEditor } from 'vue2-editor';
import axios from 'axios'
import Swal from 'sweetalert2'
import TopBadge from '../components/TopBadge'

export default {
  name: 'questiondetails',
  components: {
    VueEditor,
    TopBadge
  },
  computed: {
    questionDetails () {
      return this.$store.state.questionDetails
    }
  },
  data () {
    return {
      answersData: [],
      createdAnswer: ''
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    addAnswer () {
      const token = localStorage.getItem('token')
      
      axios({
        method: 'post',
        data: {
          description: this.createdAnswer,
          question: this.questionDetails._id
        },
        headers: {token},
        url: `${config.host}/answers`
      })
        .then(({data}) => {
          Swal.fire(
            'Your answer is submitted!',
            `Success`,
            'success'
          )
          this.getAnswers()
          this.createdAnswer = ''
        })
    }, 
    getAnswers () {
      axios({
        method: 'get',
        url: `${config.host}/answers/${this.questionDetails._id}`
      })
        .then(({data}) => {
          this.answersData = data
        })
        .catch(console.log)
    },
    upvoteAnswer(answerId) {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `http://localhost:3000/answers/upvote/${this.questionDetails._id}`,
        data: {
          id: answerId
        },
        headers: {token}
      })
        .then((result) => {
          this.getAnswers();
        })
        .catch((err) => {
          console.log('Upvote Answer Error: ', err);
        });
    },
    downvoteAnswer(answerId) {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `http://localhost:3000/answers/downvote/${this.questionDetails._id}`,
        data: {
          id: answerId
        },
        headers: {token}
      })
        .then((result) => {
          this.getAnswers();
        })
        .catch((err) => {
          console.log('Downvote Answer Error: ', err);
        });
    },
    upvoteQuestion() {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `http://localhost:3000/questions/upvote/${this.questionDetails._id}`,
        headers: {token}
      })
        .then((result) => {
          this.getDetailsQuestion()
        })
        .catch((err) => {
          console.log('Upvote Question Error: ', err);
        });
    },
    downvoteQuestion() {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `http://localhost:3000/questions/downvote/${this.questionDetails._id}`,
        headers: {token}
      })
        .then((result) => {
          this.getDetailsQuestion()
        })
        .catch((err) => {
          console.log('Downvote Question Error: ', err);
        });
    },
  },
  created () {
    this.getAnswers()
  }
}
</script>

<style scoped>
.btn {
  height: 40px;
  width: 50px;
  margin-bottom: 5px;
}

#title {
  padding-bottom: 14px;
  border-bottom: 1px solid rgb(231, 223, 223);
}

.col-11 {
  text-align: left;
}

.fa-chevron-circle-up {
  height: 100px;
}

#up {
  height: 25px;
  width: 25px;
  margin-bottom: 10px;
  margin-right:10px;
}

#down {
  height: 25px;
  width: 25px;
  margin-right:10px;
}

#currentQuestion {
  border-bottom: 1px solid rgb(231, 223, 223);
}

#answer-container {
  margin-bottom: 30px;
  padding-bottom: 30px;
}

#back {
  width: 75px !important;
  margin-top: 20px;
  margin-bottom: 40px;
  background-color: #227093;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mr-2 {
  padding-left: 19px;
  font-size: 20px;
  font-weight: bold;
}

#one {
  padding-right: 30px;
  margin-right: 0px;
}

#post-answer {
  background-color: #C9356E;
  color: white;
  font-weight: bold;
  width: 190px !important;
}

#user-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 600px;
}
</style>