require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHendler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { PORT = 3000 } = process.env;
const { MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(cors({
  credentials: true,
  origin: 'https://mesto.kondratovich.nomoreparties.sbs',
}));
app.use(cookieSession({
  secret: 'yourSecret',
  secure: false,
  httpOnly: true,
  sameSite: 'Lax',
}));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
