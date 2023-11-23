require('dotenv').config()

const express  = require('express');

const cors = require('cors')

const { dbConnection } = require('./db/db')

const app = express();

app.use(cors());

app.use(express.static('public'))

app.use(express.json())

dbConnection()


app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/advice', require('./routes/advice'));

app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT}`)
})