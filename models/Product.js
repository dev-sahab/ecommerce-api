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
        required: true
    },
    regular_price : {
        type: Number,
        default : null
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
        required : true
    },
    gallery : {
        type: Array,
        trim: true,
        default : null
    },
    categories : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    tags : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag"
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Brand"
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