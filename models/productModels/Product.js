import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    slug : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    sale_price : {
        type: Number,
        default : null
    },
    regular_price : {
        type: Number,
        required: true
    },
    short_desc : {
        type: String,
        default : null,
        trim: true
    },
    long_desc : {
        type: String,
        trim: true,
        required : true
    },
    stock : {
        type : Number,
        default : null
    },
    photo : {
        type: String,
        trim: true,
        // required : true
        default: null
    },
    gallery : {
        type: Array,
        trim: true,
        default : null
    },
    categories : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        default: null
    },
    tags : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag",
        default: null
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Brand",
        default: null
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
export default mongoose.model("Product", productSchema);