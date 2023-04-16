const express = require('express');
const router = express.Router();
const {
    getItems,
    createItem,
    deleteItems,
    getItem,
    putItem,
    deleteItem,
    getItemRatings,
    postItemRating,
    deleteItemRatings,
    getItemRating,
    updateItemRating,
    deleteItemRating,
    postItemImage
} = require('../controllers/itemController')
const protectedRoute = require('../middlewares/auth')

router.route('/')
    .get(getItems)
    .post(protectedRoute, createItem)
    .delete(deleteItems)

router.route('/:itemId')
    .get(getItem)
    .put(putItem)
    .delete(deleteItem)

router.route('/:itemId/ratings')
    .get(getItemRatings)
    .post(postItemRating)
    .delete(deleteItemRatings)

router.route('/:itemId/image')
    .post(postItemImage)

router.route('/:itemId/ratings/:ratingId')
    .get(getItemRating)
    .put(updateItemRating)
    .delete(deleteItemRating)

module.exports = router; 