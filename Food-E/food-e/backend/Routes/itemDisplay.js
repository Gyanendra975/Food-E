const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define your route
router.post("/display", async (req, res) => {
    try {

        const foodItemsCollection = mongoose.connection.db.collection('Food_Items');
        const fooditems = await foodItemsCollection.find({}).toArray();

        const foodCategory= mongoose.connection.db.collection('food_cetegory');
        const foodCategories = await foodCategory.find({}).toArray();
        
        const combinedResults = {
            fooditems,
            foodCategories
        };
        
        res.json([fooditems, foodCategories]);
        

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error fetching food items');
    }
});

module.exports = router;
