const mongoose = require('mongoose');


const dbConnection = async()=> {

try {
    await mongoose.connect(process.env.DB_CONNECT)
    console.log('DB Online')
} catch (error) {
     console.log(error)
     throw new Error('Error connecting to DB')
}
 
}


module.exports = {
    dbConnection
}