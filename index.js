// @ts-check

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { userInfo } = require('os');

require('dotenv').config(); // 환경 설정 정보

const app = express();
const port = 3000;

const config = require('./config/key');

const { User } = require('./models/User'); // 정의된 Monogo DB User 모델

// body-parser 사용을 위해 application/x-www-form-urlencoded 데이터를 분석하여 가저옴
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser 사용을 위해 json 데이터를 분석하여 가저옴
app.use(bodyParser.json());

// MongoDB 연결 설정 (mongoose)
mongoose
  .connect(
    // connect application - full driver code
    // process.env.DB_DRIVER_CODE, // (.env 참조) [dotenv를 환경변수로 사용한 방식]
    config.mongoURI, // [config 디렉토리에 환경 변수를 설정하여 사용한 방식]
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  // eslint-disable-next-line no-console
  .then(() => console.log('MongoDB Connected...'))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello world'));

// 회원 가입
app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
