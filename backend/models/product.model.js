import mongoose from "mongoose";

const productSchema = new mongoose.Schema({ // needed data of a product
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
}, {
    timestamps: true //createAt, updateAt
});

//depending the schena, create product model
const Product = mongoose.model('Product', productSchema); //create model/collection called 'Product'

export default Product; //to use product in different file








