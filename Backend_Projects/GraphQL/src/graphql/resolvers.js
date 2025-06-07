const products = require('../data/products');

const resolvers = {
    Query : {
        products:()=> products,
        product : (_, {id}) => {
            return products.find(product => product.id === id);
        }
    },
    Mutation : {
        createProduct: (_, {title, category, price, inStock}) => {
            const newProduct = {
                id: String(products.length + 1),
                title,
                category,
                price,
                inStock
            };
            products.push(newProduct);
            return newProduct;
        },
        updateProduct: (_, {id, ...updates}) => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        const updatedProduct = {
            ...products[index],
            ...updates
        };
        products[index] = updatedProduct;
        return updatedProduct;
        },
        deleteProduct: (_, {id}) => {
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }
            products.splice(index, 1);
            return true;
        }
    }
};

module.exports = resolvers;