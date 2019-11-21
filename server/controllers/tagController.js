const Tag = require('../models/Tag')
const Question = require('../models/question')

class TagController {
  static getAll(req, res, next) {
    Tag.find()
      .then(tag => {
        res.status(200).json(tag)
      })
      .catch(next)
  }

  static getOneFiltered(req, res, next) { //Filtered from current Question's Tag
    let question_tag = []
    let filtered_tag = []
    
    Question.findById(req.params.id).populate('tag')
      .then(Question => {
        question_tag = Question.tag
        return Tag.find()
      })
      .then(tag => {
        for (let i = 0; i < tag.length; i++) {
          if (question_tag.indexOf(tag[i]._id) == -1) {
            filtered_tag.push(tag[i])
          }
        }
        res.status(200).json(filtered_tag)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    let filteredByTag = []

    Question.find().populate('user')
      .then(questions => {
        for (let i = 0; i < questions.length; i++) {
          for (let j = 0; j < questions[i].tag.length; j++) {
            if(questions[i].tag[j].id == req.params.id) {
              filteredByTag.push(questions[i])
            }
          }
        }
        res.status(200).json(filteredByTag)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const createdTag = {
      name: req.body.name,
      description: req.body.description
    }

    Tag.create(createdTag)
      .then(tag => {
        res.status(201).json({
          tag, msg: 'Tag is successfully created'
        })
      })
      .catch(next)
  }
}

module.exports = TagController