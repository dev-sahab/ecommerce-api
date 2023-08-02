import mongoose from "mongoose";

// create schema for category
const tagSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    slug : {
        type : String,
        required : true,
        unique : true,
        trim : true
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
export default mongoose.model("Tag", tagSchema)