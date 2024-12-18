const Food = require('../models/fooditem'); 
// Import the Food model

function foodFilter(food, payload) {
    const{ 
        searchStr = "",
        maxPrice = Infinity,
        rating = 0,
        discount = 0,
        veg = false,
    }= payload;
    const search = searchStr.toLowerCase();
    return food.foodFilter = (
        (item) =>(
            item.name.includes(search) ||
            item.description.includes(search) ||
            item.category.includes(search) &&
            item.price <= parseFloat(maxPrice) &&
            item.rating >= parseFloat(rating) &&
            item.discount >= parseFloat(discount) &&
            (!Boolean(veg) ? true : Boolean(item.isVeg)))
    );
        
}
// exports.getAllFoodItem = (req, res ) => {
   
//     Food.find({}).then((food) => {
//         res.send({status: "success" , food });
//     })
//     .catch((err) => {
//         res.send({status: "error" , message: err.message});
//     });
        
// };

exports.getFoodItem = (req, res ) => {
    const {restroId = null} = req.params;
    if(restroId) {
        Food.find({ restroId}).then((food) => {
            const data = foodFilter(food, req.params);
            return res.send({status: "success" , food: data });
        })
        .catch((err) => {
            res.send({status: "error" , message: err.message});
        });
    }else{
        Food.find({}).then((food) => {
            const data = foodFilter(food, req.params);
            return res.send({status: "success" , food: data });
        })
        .catch ((err) => {
            return res.send({status: "error" , message: err.message});
        });
    }
};

exports.addFoodItem = (req, res) =>{
    const {name, description, details, price, category, isVeg , image, availableQuantity, discount} = req.body;
    const restroId = req.user._id;
    Food.create({ name, description, details, price, category, isVeg , image, availableQuantity, discount})
        .then ((food) => {
            res.status(201).send({
                food,
                message: "Food item added successfully",
                status: "success" 
            })
            .catch ((err) => {  
                res.status (400).send({ message: err.message, status: "error" });
            });
        });
};

exports.updateFoodItem = (req, res) => {
    const {nname, description, details, price, category, isVeg , image, availableQuantity, discount} = req.body;
    Food.findByIdAndUpdate (req.params.id, {name, description, details, price, category, isVeg , image, availableQuantity, discount})
    .then ((food) => { 
        return res.status(200).send({
            food, 
            status: "success",
            message: "Food item updated successfully"
        });

    })
    .catch((err)=>{
        return res.status(400).send({message: err.message, status: "error"});
    });
};

exports.deleteFoodItem = (req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then ((food) => {
            return res.status(200).send({
                food,
                status : "success",
                message: "Food item deleted successfully"
            })
            .catch ((err) => {
                return res.send({message: err.message, status: "error"});
            })
        })
}