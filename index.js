// @ts-check

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config(); // 환경 설정 정보

const app = express();
const port = 3000;

// MongoDB 연결 설정 (mongoose)
mongoose
  .connect(
    // connect application - full driver code (.env 참조)
    process.env.DB_DRIVER_CODE,
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
