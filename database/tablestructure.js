// ALL DATABASE RELATED QUERIES AND DONE HERE

const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MRP_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  Discount_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  today_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  current_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define associations
Category.hasMany(Product, {
  foreignKey: {
    name: "categoryId",
    // allowNull: false,
    onDelete: "CASCADE",
  },
});
Product.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    // allowNull: false,
    onDelete: "CASCADE",
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ force: false }) // will not drop the table and recreate it
  .then(() => {
    console.log("Tables have been created successfully.");
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });

module.exports = { Category, Product, sequelize };
