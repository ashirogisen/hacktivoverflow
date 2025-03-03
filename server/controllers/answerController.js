const Answer = require('../models/answer')
const Question = require('../models/question')
const mongoose = require('mongoose');
const User = require('../models/user')

class answerController {
  static create (req, res, next) {
    const user_id = req.LoggedUser.id
    const createdData = {
      question: req.body.question,
      description: req.body.description,
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
      user: user_id
    }
    let userPoint = 0

    Question.findById(req.body.question)
      .then(question_data => {
        let user = question_data.user
        if (user !== user_id) {
          console.log('masuk1')
          return Answer.create(createdData)
        } else {
          throw {
            msg: 'You cannot answer your own question'
          }
        }
      })
      .then(answer => {
        console.log('masuk2')
        return User.findById(user_id)
      })
      .then(user => {
        console.log('masuk3')
        userPoint = user.point
        return User.findByIdAndUpdate(user_id, {
          point: userPoint+10
        })
      })
      .then(user => {
        res.status(200).json({
          msg: 'Your answer is added'
        })
      })
      .catch(next)
  }

  static getByUserId (req, res, next) {
    const userId = new mongoose.Types.ObjectId(req.LoggedUser.id);
    const user = {
      user: userId
    }

    Answer.find(user).populate('question')
      .then(answers_data => {
        res.status(200).json(answers_data)
      })
      .catch(next)
  }

  static getByQuestionId (req, res, next) {
    const question_id = req.params.id
    const question = {
      question: question_id
    }

    Answer.find(question).populate('user')
      .then(answers_data => {
        res.status(200).json(answers_data)
      })
      .catch(next)
  }

  static update (req, res, next) {
    const id = req.params.id
    const updatedData = {
      description: req.body.description
    }

    Answer.findByIdAndUpdate(id, updatedData)
      .then(updated_data => {
        res.status(200).json(updated_data)
      })
      .catch(next)
  }

  static delete (req, res, next) {
    const id = req.params.id
    
    Answer.findByIdAndDelete(id)
      .then(deleted_data => {
        res.status(200).json(deleted_data)
      })
      .catch(next)
  }

  static upvote (req, res, next) {
    const verifier = {
      question: req.params.question_id,
      _id: req.body.id
    }

    Answer.findOne(verifier)
      .then(answer => {
        const userId = new mongoose.Types.ObjectId(req.LoggedUser.id)
        if(answer.user.equals(userId) === false) {
          let alreadyDownVote = answer.downvotes.indexOf(req.LoggedUser.id) !== -1
          if (answer.upvotes.indexOf(req.LoggedUser.id) === -1) {
            if(alreadyDownVote) {
              answer.update({
                $pull: {
                  downvotes: req.LoggedUser._id
                }
              })
                .then(pullResult => {
                  answer.update({
                    $push: {
                      upvotes: req.LoggedUser.id
                    }
                  })
                    .then(pushResult => {
                      let response = {
                        message: 'Successfully upvoted answer'
                      }
                      res.status(200).json(response)
                    })
                    .catch(next)
                })
                .catch(next)
            } else {
              answer.update({
                $push: {
                  upvotes: req.LoggedUser.id
                }
              })
                .then(pushResult => {
                  let response = {
                    message: 'Successfully upvoted answer'
                  }
                  res.status(200).json(response);
                })
                .catch(next)
            }
          } else {
            answer.update({
              $pull: {
                upvotes: req.LoggedUser.id
              }
            })
              .then(pullResult => {
                let response = {
                  message: 'Successfully un-upvoted answer'
                }
                res.status(200).json(response)
              })
              .catch(next)
          }
        } else {
          console.log('You cannot upvote your own answer');
          res.status(400).json({
            message: 'You cannot upvote your own answer'
          });
        }
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const verifier = {
      question: req.params.question_id,
      _id: req.body.id
    }

    Answer.findOne(verifier)
      .then(function(answer) {
        const userId = new mongoose.Types.ObjectId(req.LoggedUser.id);    
        if (answer.user.equals(userId) === false) {
          let alreadyUpvote = answer.upvotes.indexOf(req.LoggedUser.id) !== -1;
          if (answer.downvotes.indexOf(req.LoggedUser.id) === -1) {
            if (alreadyUpvote) {
              answer.update({
                $pull: {
                  upvotes: req.LoggedUser.id
                }
              })
                .then(function(pullResult) {
                  answer.update({
                    $push: {
                      downvotes: req.LoggedUser.id
                    }
                  })
                    .then(function(pushResult) {
                      let response = {
                        message: 'Successfully downvoted answer'
                      }
                      res.status(200).json(response);
                    })
                    .catch(next)
                })
                .catch(next)
            } else {
              answer.update({
                $push: {
                  downvotes: req.LoggedUser.id
                }
              })
                .then(function(pushResult) {
                  let response = {
                    message: 'Successfully downvoted answer'
                  }
                  res.status(200).json(response);
                })
                .catch(next)
            }
          } else {
            answer.update({
              $pull: {
                downvotes: req.LoggedUser.id
              }
            })
              .then(function(pullResult) {
                let response = {
                  message: 'Successfully un-downvoted answer'
                }
                res.status(200).json(response);
              })
              .catch(next)
          }
        } else {
          console.log('You cannot downvote your own answer');
          res.status(400).json({
            message: 'You cannot downvote your own answer'
          });
        }
      })
      .catch(next)
  }

}

module.exports = answerController