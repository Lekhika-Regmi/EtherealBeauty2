const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.config"); // Sequelize instance

const Product = sequelize.define(
  "Product", {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  skin_type_suitability: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING, // URL or path to the image
    allowNull: true,
  },
  brand: {
    type: DataTypes.STRING, // Brand name of the product
    allowNull: true,
  },
},
  {
    tableName: "Products",
    timestamps: false, // Disable createdAt and updatedAt
  }
);

module.exports = Product;
