// ALL LOGIC OF API IS CREATED

const { Product, Category } = require("../database/tablestructure");
const moment = require("moment");

exports.addProducts = async (req, res) => {
  try {
    const { products } = req.body;

    const createdProducts = await Promise.all(
      products.map(async (product) => {
        const {
          Name,
          MRP_amount,
          Discount_amount,
          start_date,
          end_date,
          today_date,
          categoryName,
        } = product;

        // Find the category by name or create a new one
        let category = await Category.findOne({ where: { categoryName } });

        if (!category) {
          category = await Category.create({ categoryName });
        }

        // Calculate current_price based on start_date and end_date
        const currentDate = moment(today_date);
        const startDate = moment(start_date);
        const endDate = moment(end_date);
        const current_price = currentDate.isBetween(
          startDate,
          endDate,
          null,
          "[]"
        )
          ? Discount_amount
          : MRP_amount;

        const newProduct = await Product.create({
          Name,
          MRP_amount,
          Discount_amount,
          start_date,
          end_date,
          today_date,
          current_price,
          categoryId: category.id,
        });

        return newProduct;
      })
    );

    res.status(201).json({
      status: "success",
      data: createdProducts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["Name", "current_price"],
    });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getProductsWithCategories = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ["categoryName"] }],
      attributes: ["Name", "current_price"],
    });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
