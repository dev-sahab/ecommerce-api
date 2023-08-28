import mongoose from "mongoose";

// create schema for category
const brandSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    slug : {
        type : String,
        required : true,
    },
    logo : {
        type : String,
        trim : true,
        default : null
    },
    trash : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    }
},{ 
    timestamps : true 
})

// export schema model
export default mongoose.model("Brand", brandSchema)