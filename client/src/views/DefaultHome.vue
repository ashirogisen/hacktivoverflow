<template>
  <div id="ask-question">
    <img class="ask mx-auto my-2" src="https://i.imgur.com/9z9JdXC.png" alt="questions">
    <center><button id="ask-btn" class="btn" data-toggle="collapse" data-target="#collapse-btn-1">Ask Question</button></center><br>
    <div class="card mb-3">
      <div class="collapse" id="collapse-btn-1">
        <div class="card-body">
          <form @submit.prevent="" class="mb-2">
            <div class="form-group">
                <input type="text" v-model="createdQuestion.title" class="form-control" placeholder="Title">
            </div>
            <button data-toggle="modal" data-target="#createTag" type="button" style="background-color: #0a3d62; margin-bottom: 15px;" class="btn createtag-btn"> Create New Tag</button>
            <div class="form-row align-items-center">
              <div class="col-auto">
                  <div class="tags-2">
                      <div v-for="(tag, index) in tagsData" :key="index">
                          <div id="tag-name">
                              <center><strong style="margin-left: 7px;">{{tag.name}}</strong></center>
                              <button id="plus-button" @click="addToCurrentTags(tag._id, tag.name, index)" type="button" class="btn"><i class="far fa-plus-square"></i></button>
                          </div>
                      </div> 
                  </div>    
              </div>
            </div> <br>
            <div class="form-row align-items-center">
              <div class="col-auto">
                  <h6 id="current-tag-text" style="color: rgb(65, 78, 78);"> Current tags:</h6>
                  <div class="tags-2">
                      <div v-for="(tag, index) in createdQuestion.tag" :key="index">
                          <div id="tag-name">
                              <center><strong style="margin-left: 7px;">{{tag.name}}</strong></center>
                              <button id="plus-button"  @click="removeFromCurrentTags(tag.id, tag.name, index)" type="button" class="btn"><i class="far fa-minus-square"></i></button>
                          </div>
                      </div> 
                  </div>    
              </div>
            </div><br>
            <div class="form-group">
                <vue-editor v-model="createdQuestion.description"></vue-editor>
            </div>
            <button @click="createQuestion()" id="post-question" type="submit" class="btn">Post</button>
          </form>
        </div>
      </div>
    </div> <br>

    <div class="modal fade" id="createTag">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Tag</h5>
            <button class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group d-flex flex-column">
                <label for="description" class="text-left">Title</label>
                <input type="text" class="form-control" id="message" rows="1" v-model="newTag.name">
              </div>
               <div class="form-group d-flex flex-column">
                <label for="description" class="text-left">Description</label>
                <textarea class="form-control" id="message" rows="3" v-model="newTag.description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer ">
            <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="createTag()">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div id="top-questions">
      <center>
        <div v-for="(question, index) in questions" :key="index" style="margin-bottom:10px;" class="card w-75">
          <div class="card-body">
            <h5 class="card-title">{{question.title}}</h5>
            <div id="card-question">
              <span style="width: 80px; margin-bottom: 10px;" class="badge bd-view"><i class="fas fa-eye"></i> View: {{question.views}}</span>
              <div class="q-tags">
                <div v-for="(tag, index) in question.tag" :key="index">
                  <span @click="getQuestionsByTag(tag.id)" style="margin-right: 5px; margin-bottom: 10px;" id="tag-badge" class="badge badge-info">{{tag.name}}</span>
                </div>
              </div>
              <button @click="toDetails(question._id)" type="button" class="btn details-btn">Details</button>
              <div id="writer">
                <span class="badge bd-writer">{{question.user.name}}</span>
                <TopBadge v-if="question.user.point > 50" />
              </div>
            </div>
          </div>
        </div>
      </center> 
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { config } from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'
import TopBadge from '../components/TopBadge'

export default {
  name: 'defaulthome',
  components: {
    VueEditor,
    TopBadge
  },
  data () {
    return {
      createdQuestion: {
        title: '',
        description: '',
        tag: []
      },
      newTag: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    getQuestions() {
      this.$store.dispatch('getQuestions')
    },
    addToCurrentTags(id, name, index) {
      this.createdQuestion.tag.unshift({id, name})
      this.tagsData.splice(index, 1)
      this.tagsData = this.tagsData.sort((a, b) => (a.name > b.name) ? 1 : -1)
    },
    removeFromCurrentTags(id, name, index) {
      this.tagsData.unshift({id, name})
      this.createdQuestion.tag.splice(index, 1)
      this.tagsData = this.tagsData.sort((a, b) => (a.name > b.name) ? 1 : -1)
    },
    getQuestionsByTag(id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${config.host}/tags/${id}`,
        headers: {token}
      })
        .then(({data}) => {
          this.$store.commit('SETQUESTIONS', data)
        })
        .catch(console.log)
    },
    getTags () {
      this.$store.dispatch('getTags')
    },
    createTag () {
      axios({
        method: 'post',
        url: `${config.host}/tags`,
        data: {
          name: this.newTag.name,
          description: this.newTag.description
        }
      })
        .then(({data}) => {
          Swal.fire(
            'New tag created!',
            `Success`,
            'success'
          )
          this.newTag.name = ''
          this.newTag.description = ''
          this.tagsData.push(data)
          this.getTags()
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
    },
    createQuestion() {
      const token = localStorage.getItem('token')
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first'
        })
      } else {
          axios({
            method: 'post',
            data: {
              title: this.createdQuestion.title,
              description: this.createdQuestion.description,
              tag: this.createdQuestion.tag
            },
            headers: {token},
            url: `${config.host}/questions`
          })
            .then(({data}) => {
              Swal.fire(
                'Question is asked!',
                `Success`,
                'success'
              )
              this.getTags()
              this.createdQuestion.tag = []
              this.createdQuestion.title = ''
              this.createdQuestion.description = ''
              this.getQuestions()
            })
            .catch(console.log)
      }
    }

  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    tagsData () {
      return this.$store.state.tags
    }
  },
  created () {
    this.getQuestions()
    this.getTags()
  }
}
</script>

<style scoped>
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

.q-tags {
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

#main-sidebar {
  margin-top: 50px;
}

#ask-question {
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

.createtag-btn {
  color: white;
  font-weight: bold;
}

.bd-view {
  background-color: rgb(50, 82, 95);
  color: white;
  font-weight: bold;
}
</style>