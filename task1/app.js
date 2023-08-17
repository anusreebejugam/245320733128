const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const trainsRouter = require('./routes/trains');

const app = express();
const PORT = 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trains', trainsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;