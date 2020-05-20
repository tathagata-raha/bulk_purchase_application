const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();
// let User = require('./models/user.model');

app.use(cors());
app.use(express.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27018/ass1', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

const usersRouter = require('./routes/users');
const productsvendorRouter = require('./routes/productsvendor');
const productscustomerRouter = require('./routes/productscustomer');
const userdataRouter = require('./routes/userdata');

app.use('/productsv', productsvendorRouter);
app.use('/productsc', productscustomerRouter);
app.use('/users', usersRouter);
app.use('/userdata', userdataRouter);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
