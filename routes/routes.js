// IT USES TO REDIRECT THE API

const express = require("express");
const router = express.Router();
const logicController = require("../controllers/logic_controllers");

// POST API to add data to the table
router.post("/additem", logicController.addProducts);

// GET API to fetch all products
router.get("/display", logicController.getProducts);

// GET API to fetch all products with categories using JOIN
router.get(
  "/getProductsAndCategories",
  logicController.getProductsWithCategories
);

module.exports = router;
