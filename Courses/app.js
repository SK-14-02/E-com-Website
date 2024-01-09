const express = require('express');
const { dbConn } = require('./config/db')
const courseRoutes = require('./routes/course');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();

const port = 4000;

app.use(express.json())
app.use(cors()); 

app.use(userRoutes);
app.use(courseRoutes);


dbConn();
app.listen(port, () => {
    console.log('server started');
})