const Food = require('../models/fooditem'); 
function foodFilter(foodList, payload) {
    const { 
        searchStr = "",
        maxPrice = Infinity,
        rating = 0,
        discount = 0,
        veg = false,
    } = payload;
    
    const search = searchStr.toLowerCase();
    
    return foodList.filter((item) => 
        (item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)) &&
        item.price <= parseFloat(maxPrice) &&
        item.rating >= parseFloat(rating) &&
        item.discount >= parseFloat(discount) &&
        (!Boolean(veg) ? true : Boolean(item.isVeg))
    );
}

exports.getAllFoodItem = (req, res ) => {
   
    Food.find({}).then((food) => {
        res.send({status: "success" , food });
    })
    .catch((err) => {
        res.send({status: "error" , message: err.message});
    });
        
};

exports.getFoodItem = (req, res ) => {
    const { restroId } = req.params; 
    const filterPayload = req.query; 
    if (restroId) {
        Food.find({ restroId }).then((food) => {
            const filteredFood = foodFilter(food, filterPayload);
            return res.send({ status: "success", food: filteredFood });
        })
        .catch((err) => {
            return res.send({ status: "error", message: err.message });
        });
    } else {
        Food.find({}).then((food) => {
            const filteredFood = foodFilter(food, filterPayload);
            return res.send({ status: "success", food: filteredFood });
        })
        .catch((err) => {
            return res.send({ status: "error", message: err.message });
        });
    }
};

exports.getSingleFood = (req, res) => {
    const {food_id} = req.params; 
    Food.findOne({_id : food_id}).then((food) => {
        if(food){
           return res.status(200).send({food});
        }
    }).catch((error) => {
       return res.status(404).send({ message: "Food not found", status: "error" });
    });

};

exports.addFoodItem = (req, res) => {
    const { name, description, details, price, category, isVeg, image, availableQuantity, discount, rating } = req.body;

      const restroId = req.user._id;

        if (!name || !description || !category || !price) {
        return res.status(400).send({
            message: "Required fields are missing. Name, description, category, and price are required.",
            status: "error"
        });
    }

    Food.create({
        name,
        description,
        details,        
        price,
        category,
        isVeg,          
        image,           
        availableQuantity,
        discount,
        restroId,
        rating          
    })
    .then((food) => {
        res.status(201).send({
            food,
            message: "Food item added successfully",
            status: "success"
        });
    })
    .catch((err) => {
        res.status(400).send({
            message: "Error creating food item",
            status: "error",
            error: err.message || err
        });
    });
};


exports.updateFoodItem = (req, res) => {
    const {name, description, details, price, category, isVeg , image, availableQuantity, discount} = req.body;
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