const Product = require('../models/Product');

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    product: async (_, { id }) => await Product.findById(id),
  },
  Mutation: {
    createProduct: async (_, args) => {
      const newProduct = new Product(args);
      return await newProduct.save();
    },
    updateProduct: async (_, { id, ...updates }) => {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      return updatedProduct;
    },
    deleteProduct: async (_, { id }) => {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return !!deletedProduct; // Returns true if deletion was successful
    },
  }
}

module.exports = resolvers;