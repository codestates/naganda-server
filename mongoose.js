const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/naganda', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
//* 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
//* 연결 성공
db.once('open', function() {
    console.log('Connected!');
});

//* Schema 생성
var users = new mongoose.Schema({
    nickname : {
        type: String,
        required: true,
        trim: true,
      },
    email : {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
              } 
        },
        trim: true,
      },
    password : {
        type: String,
        required: true,
        trim: true,
      },
    avata : 'string'
});

var schedule = new mongoose.Schema({
    thumbnail : [{ img : 'string' }],
    scheduleTitle : {
        type: String,
        required: true,
      },
    hashtag : [{ tagName : 'string', required: true, trim: true }],
    best : {
        type: Number,
        default: 0,
      },
    worst : {
        type: Number,
        default: 0,
      },
    detail : [{
        detailTitle : {
            type: String,
            required: true,
          },
        comment : 'string',
        time : {
            type: String,
            required: true,
          },
        place : 'string',
        position : {
            type: String,
            required: true,
          }
    }],
    bookmark : {
        type: Boolean,
        default: false,
      },
    nickname: {
        type: String,
        required: true,
      }
});

const usersModel = mongoose.model('Schema', users);
const scheduleModel = mongoose.model('Schema', schedule);

const newUser = new usersModel({ nickname: 'admin', email: 'admin@naver.com', password: '1234' });

newUser.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});