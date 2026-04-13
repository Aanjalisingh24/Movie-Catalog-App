const mongoose = require('mongoose');

const DBCONNECT = async(req , res)=>{
  try{
    mongoose.connect(process.env.MONGO_URL);
    console.log('database connected');
  }
  catch(err){
    console.log(err.message)
  }
}

module.exports = DBCONNECT;