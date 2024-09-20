const express = require('express');
const app = express();
const cors = require('cors');
const usersRouter = require('./routes/v1/users.js');

const corsOptions = {
  origin: '*', // allow all origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // allow all HTTP methods
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// middleware to parse JSON bodies
app.use(express.json());

// enable CORS
app.use(cors(corsOptions));

// debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

const PORT = process.env.PORT || 8080;

app.use('/v1/users', usersRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});