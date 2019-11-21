const Question = require('../models/question')
const User = require('../models/user')
const mongoose = require('mongoose');

class questionController {
  static create(req, res, next) {
    const user_id = req.LoggedUser.id
    const createdData = {
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: user_id,
      watchedTag: []
    }
    Question.create(createdData)
      .then(created_data => {
        res.status(201).json(created_data)
      })
      .catch(next)
  }

  static getTop(req, res, next) {
    Question.find().sort([["views", 1]]).populate('user')
      .then(questions_data => {
        res.status(200).json(questions_data)
      })
      .catch(next)
  }

  static getDetails(req, res, next) {
    const id = req.params.id

    Question.findById(id).populate('user')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static getByUserId(req, res, next) {
    const user_id = req.LoggedUser.id
    const user = {
      user: user_id
    }

    Question.find(user)
      .then(questions_data => {
        res.status(200).json(questions_data)
      })
      .catch(next)
  }

  static getByWatchedTags (req, res, next) {
    let watchedTag = []
    let filteredForWatchedTags = []

    User.findById(req.LoggedUser.id)
      .then(user => {
        watchedTag = user.watchedTag
        return Question.find().populate('user')
      })
      .then(questions => {
        for (let i = 0; i < watchedTag.length; i++) {
          for (let j = 0; j < questions.length; j++) {
            for (let k = 0; k < questions[j].tag.length; k++) {
              if (watchedTag[i] == questions[j].tag[k].id) {
                filteredForWatchedTags.push(questions[j])
              }
            }
          }
        }
        res.status(200).json(filteredForWatchedTags)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const id = req.params.id
    const editedData = {
      title: req.body.title,
      description: req.body.description
    }
    
    Question.findByIdAndUpdate(id, editedData)
      .then(edited_data => {
        res.status(200).json(edited_data)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const id = req.params.id

    Question.findByIdAndDelete(id)
      .then(deleted_data => {
        
        res.status(200).json(deleted_data)
      })
      .catch(next)
  }

  static searchQuestion(req, res, next) {
    Question.find({name: new RegExp(req.params.keyword, 'i')})
      .then(datas => {
        res.status(200).json(datas)
      })
      .catch(next)
  }

  static upvote (req, res, next) {
    const verifier = {
      _id: req.params.id
    }

    Question.findOne(verifier)
      .then(question => {
        const userId = new mongoose.Types.ObjectId(req.LoggedUser.id)
        if(question.user.equals(userId) === false) {
          let alreadyDownVote = question.downvotes.indexOf(req.LoggedUser.id) !== -1
          if (question.upvotes.indexOf(req.LoggedUser.id) === -1) {
            if(alreadyDownVote) {
              question.update({
                $pull: {
                  downvotes: req.LoggedUser._id
                }
              })
                .then(pullResult => {
                  question.update({
                    $push: {
                      upvotes: req.LoggedUser.id
                    }
                  })
                    .then(pushResult => {
                      let response = {
                        message: 'Successfully upvoted question'
                      }
                      res.status(200).json(response)
                    })
                    .catch(next)
                })
                .catch(next)
            } else {
              question.update({
                $push: {
                  upvotes: req.LoggedUser.id
                }
              })
                .then(pushResult => {
                  let response = {
                    message: 'Successfully upvoted question'
                  }
                  res.status(200).json(response);
                })
                .catch(next)
            }
          } else {
            question.update({
              $pull: {
                upvotes: req.LoggedUser.id
              }
            })
              .then(pullResult => {
                let response = {
                  message: 'Successfully un-upvoted question'
                }
                res.status(200).json(response)
              })
              .catch(next)
          }
        } else {
          console.log('You cannot upvote your own question');
          res.status(400).json({
            message: 'You cannot upvote your own question'
          });
        }
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const verifier = {
      _id: req.params.id
    }

    Question.findOne(verifier)
      .then(function(question) {
        const userId = new mongoose.Types.ObjectId(req.LoggedUser.id);    
        if (question.user.equals(userId) === false) {
          let alreadyUpvote = question.upvotes.indexOf(req.LoggedUser.id) !== -1;
          if (question.downvotes.indexOf(req.LoggedUser.id) === -1) {
            if (alreadyUpvote) {
              question.update({
                $pull: {
                  upvotes: req.LoggedUser.id
                }
              })
                .then(function(pullResult) {
                  question.update({
                    $push: {
                      downvotes: req.LoggedUser.id
                    }
                  })
                    .then(function(pushResult) {
                      let response = {
                        message: 'Successfully downvoted question'
                      }
                      res.status(200).json(response);
                    })
                    .catch(next)
                })
                .catch(next)
            } else {
              question.update({
                $push: {
                  downvotes: req.LoggedUser.id
                }
              })
                .then(function(pushResult) {
                  let response = {
                    message: 'Successfully downvoted question'
                  }
                  res.status(200).json(response);
                })
                .catch(next)
            }
          } else {
            question.update({
              $pull: {
                downvotes: req.LoggedUser.id
              }
            })
              .then(function(pullResult) {
                let response = {
                  message: 'Successfully un-downvoted question'
                }
                res.status(200).json(response);
              })
              .catch(next)
          }
        } else {
          console.log('You cannot downvote your own question');
          res.status(400).json({
            message: 'You cannot downvote your own question'
          });
        }
      })
      .catch(next)
  }

  static updateViews(req, res, next) {
    const id = {
      _id: req.params.id
    }

    Question.findById(id)
      .then(question_data => {
        let views_count = question_data.views
        let updated_views = views_count + 1
        const editedData = {
          views: updated_views
        }
        Question.findByIdAndUpdate(id, editedData)
          .then(updated_question => {
            res.status(200).json({
              msg: 'Views count updated'
            })
          })
          .catch(next)
      })
      .catch(next)
  }
}   

module.exports = questionController