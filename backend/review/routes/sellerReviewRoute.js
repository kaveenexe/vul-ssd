// routes/todo.js
const express = require("express");
const router = express.Router();

const {
    getAllReviewItems,
    getSellerReviewItems,
    postCreateReviewItem,
    putUpdateReviewItem,
    deleteReviewItem
} = require("../controllers/sellerReviewController");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get("/", getAllReviewItems);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 *  
 */

router.get("/:sellerId", getSellerReviewItems);

router.post("/", postCreateReviewItem);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id", putUpdateReviewItem);


/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id", deleteReviewItem);

module.exports = router;