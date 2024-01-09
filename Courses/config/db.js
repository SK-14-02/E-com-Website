const mongoose = require('mongoose');
exports.dbConn = async () => {
    try {
        const dbUrl = "mongodb+srv://sk:w9TwGuFTiwIS4Dn6@cluster0.4czbtis.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('database connected');
    
    }catch(err){
        console.log(`database connection error ${err.message}`);
    }
}