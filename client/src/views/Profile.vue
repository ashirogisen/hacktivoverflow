<template>
  <div id="main-profile">
    <div class="row">
      <div id="my-questions" class="col-6">
        <h4>Questions</h4><hr>
        <div v-for="(question, index) in myQuestions" :key="index" style="margin-bottom: 10px;" class="card w-75">
          <div class="card-body">
            <h5 style="margin-bottom: 20px;" class="card-title">{{question.title}}</h5>
            <button type="button" data-toggle="modal" data-target="#editQuestion" @click="editQuestions(question._id, question.title, question.description, question.tag)" style="margin-right: 8px; background-color: #0a3d62;" class="btn edit-delete-btns"><i class="far fa-edit"></i> Edit</button>
            <button @click="deleteQuestion(question._id)" type="button" class="btn edit-delete-btns"><i class="far fa-trash-alt"></i> Delete</button>
          </div>
        </div>
      </div>
      <div id="my-answers" class="col-6">
         <h4>Answers</h4><hr>
        <div v-for="(answer, index) in myAnswers" :key="index" style="margin-bottom: 10px;" class="card w-75">
          <div class="card-body">
            <h5 style="margin-bottom: 20px;" v-html="answer.description" class="card-title"></h5>
            <button data-toggle="modal" data-target="#editAnswer" type="button" @click="editAnswers(answer._id, answer.description)" style="margin-right: 8px; background-color: #0a3d62;" class="btn edit-delete-btns"><i class="far fa-edit"></i> Edit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Question Modal -->
    <div class="modal fade" id="editQuestion">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Question</h5>
            <button class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
          <form>
            <div class="form-group d-flex flex-column">
                <label for="description" class="text-left">Title</label>
                <textarea class="form-control" id="message" rows="3" v-model="editQuestion.title"></textarea>
            </div>
            <vue-editor id="editor" v-model="editQuestion.description"></vue-editor>
          </form>
          </div>
          <div class="modal-footer ">
            <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="updateQuestion(editQuestion.id)">Update</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Answer Modal -->
    <div class="modal fade" id="editAnswer">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Answer</h5>
            <button class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <form>
              <vue-editor id="editor" v-model="editAnswer.description"></vue-editor>
            </form>
          </div>
          <div class="modal-footer ">
            <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="updateAnswer(editAnswer.id)">Update</button>
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
import { VueEditor } from 'vue2-editor';

export default {
  name: 'profile',
  components: {
    VueEditor
  },
  data () {
    return {
      myAnswers: [],
      myQuestions: [],
      editQuestion: {
        id: '',
        title: '',
        description: '',
        tag: null
      },
      editAnswer: {
        id: '',
        description: ''
      }
    }
  },
  methods: {
    getMyQuestions() {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${config.host}/questions`,
        headers: {token}
      })
        .then(({data}) => {
          this.myQuestions = data.reverse()
        })
        .catch(console.log)

    },
    getMyAnswers() {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${config.host}/answers`,
        headers: {token}
      })
        .then(({data}) => {
          this.myAnswers = data.reverse()
        })
        .catch(console.log)
    },
    editQuestions(id, title, description, tag) {
      this.editQuestion.id = id
      this.editQuestion.title = title
      this.editQuestion.description = description
      this.editQuestion.tag = tag 
    },
    updateQuestion (id) {
      const token = localStorage.getItem('token')
        axios({
          method: 'put',
          data: {
              title: this.editQuestion.title,
              description: this.editQuestion.description,
              tag: this.editQuestion.tag
          },
          url: `${config.host}/questions/${id}`,
          headers: {token}
        })
          .then(({data}) => {
            Swal.fire(
              'Question is updated!',
              `Success`,
              'success'
            )
            this.editQuestion.title = data.title
            this.editQuestion.description = data.description
            this.editQuestion.tag = null
            this.getMyQuestions()
          })
    },
    editAnswers(id, description) {
      this.editAnswer.id = id
      this.editAnswer.description = description
    },
    updateAnswer (id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        data: {
            description: this.editAnswer.description
        },
        url: `${config.host}/answers/${id}`,
        headers: {token}
      })
        .then(({data}) => {
           Swal.fire(
            'Answer is updated!',
            `Success`,
            'success'
          )
          this.editAnswer.title = data.title
          this.editAnswer.description = data.description
          this.getMyAnswers()
        })
    },
    deleteQuestion(id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `${config.host}/questions/${id}`,
        headers: {token}
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
                this.getMyQuestions()
                Swal.fire(
                'Deleted!',
                'Your post has been deleted.',
                'success'
                )
            }
          })
        })
        .catch(console.log)
    }
  },
  created () {
    this.getMyQuestions()
    this.getMyAnswers()
  }

}
</script>

<style>
#main-profile {
  margin-top: 50px;
}

#my-questions, #my-answers {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-delete-btns {
  background-color: #b71540;
  color: white;
  font-weight: bold;
}

.edit-delete-btns:hover {
  background-color: #b71540;
  color: white;
  font-weight: bold;
}
</style>