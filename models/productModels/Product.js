import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    productType: {
      type: String,
      enum: ["simple", "variable", "group", "external"],
      default: "simple",
    },
    simpleProduct: {
      salePrice: {
        type: Number,
        default: null,
      },
      regularPrice: {
        type: Number,
        default: null,
      },
      stock: {
        type: Number,
        default: null,
      },
      photo: {
        type: [String],
        default: [],
      },
    },
    variableProduct: [
      {
        color: {
          type: String,
          default: null,
        },
        size: {
          type: String,
          default: null,
        },
        salePrice: {
          type: Number,
          default: null,
        },
        regularPrice: {
          type: Number,
          required: true,
        },
        stock: {
          type: Number,
          default: null,
        },
        photo: {
          type: [String],
          default: [],
        },
      },
    ],

    groupProduct: [
      {
        name: {
          type: "String",
          required: true,
          trim: true,
        },
        salePrice: {
          type: Number,
          default: null,
        },
        regularPrice: {
          type: Number,
          required: true,
        },
        stock: {
          type: Number,
          default: null,
        },
        photo: {
          type: [String],
          default: [],
        },
      },
    ],
    externalProduct: {
      salePrice: {
        type: Number,
        default: null,
      },
      regularPrice: {
        type: Number,
        default: null,
      },
      photo: {
        type: [String],
        default: [],
      },
      link: {
        type: String,
        trim: true,
        default: null,
      },
    },
    shortDesc: {
      type: String,
      default: null,
      trim: true,
    },
    longDesc: {
      type: String,
      trim: true,
      default: null,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      default: null,
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      default: null,
    },
    sku: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export product model
export default mongoose.model("Product", productSchema);