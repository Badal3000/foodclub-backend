const express = require('express');
const foodItems = require('../fooditems');


const router = express.router();

router.get('/', foodItems );
module.exports = router;