import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    phone : {
        type : String,
        trim : true,
        default : null
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type: String,
        trim: true,
        default : null
    },
    birth_date : {
        type : String,
        default : null
    },
    photo : {
        type: String,
        trim: true,
        default : null
    },
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Role",
        required : true
    },
    status: {
        type: Boolean,
        default : true
    },
    trash : {
        type: Boolean,
        default : false
    }
},{
    timestamps: true
});

// export product model
export default mongoose.model("User", userSchema);