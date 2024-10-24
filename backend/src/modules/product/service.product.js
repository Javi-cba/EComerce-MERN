const productModel = require('../../models/product');

async function findAll() {
  try {
    return await productModel.find().sort({ title: 1 }).exec();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function insertMany(product) {
  try {
    return await productModel.insertMany(product);
  } catch (error) {
    console.error('Error inserting products:', error);
    throw error;
  }
}

module.exports = { findAll, insertMany }; // exportación CommonJS
