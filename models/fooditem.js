const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    isVeg :{
        type:Boolean,
        default:true
    },
    image: {
        type: String,
        imgUrl: {
            type: String,
            default: 'https://img.freepik.com/premium-photo/food-item-background-wallpaper_492154-7058.jpg?w=900'
        }
    },
    rating: {
        type: Number,
        default: 0
    },
    restroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restro'
    },
    availableQuantity : {
        type:Number,
        default:0
    },
    discount: {
        type : Number,
        default:0
    },
    reviews: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                rating: {
                    type: Number,
                    default: 0
                },
                review: {
                    type: String,

                },
            }],
        default: []
    },
}, {
    timestamps: true
})

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;

