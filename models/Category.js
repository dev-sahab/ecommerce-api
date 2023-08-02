import mongoose from "mongoose";

// create schema for category
const categorySchema = mongoose.Schema({
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
    photo : {
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
export default mongoose.model("Category", categorySchema)