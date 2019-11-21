if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cron = require("node-cron");
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const cronJob = require('./helpers/cronJob');
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

app.use(cors())

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
  .then(() => {
    console.log('Mongoose is successfully connected')
  })
  .catch(console.log)

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)

// cron.schedule("* * * * *", function() {
//   console.log("running a task every minute");
// });

io.on('connection', function(socket) {
  socket.on('sendMessage', function(data) {
    io.emit('sendMessage', data)
  })
})

http.listen(PORT, cronJob, ()=> {
  console.log(`App is running on PORT ${PORT}`)
})

module.exports = app


