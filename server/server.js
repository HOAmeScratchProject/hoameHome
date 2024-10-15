const path = require('path');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const cookieParser = require('cookie-parser') //Using later on make sure to install
const cors = require('cors');

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);

// CORS (Cross Origin Resource Sharing) Middleware
app.use(
  cors({
    origin: 'http://localhost:8080', // Specify the origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: [
      'Content-Type',
      'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With'
    ], // Defining allowed headers
  })
);

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
