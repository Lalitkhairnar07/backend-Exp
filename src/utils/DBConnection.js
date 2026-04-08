const mongoose = require("mongoose")

const DBConnection = ()=>{

    mongoose.connect("mongodb://127.0.0.1/expense_tracker").then(()=>{
        console.log("database conneced..")
    }).catch((err)=>{
        console.log("error while connecting db..",err)
    })

}
module.exports = DBConnection