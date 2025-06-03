const Product = require('../models/Product');

const getProductStats = async(req, res)=> {
    try{
        const result = await Product.aggregate([
            // stage 1
            {
                $match: {
                    inStock : false,
                    price: {
                        $gte: 100
                    }
                } 
            },
            // stage 2 : Group doc
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                        },
                    count: {
                        $sum: 1,
                    }

                }
            }

        ]);
        res.status(200).json({
            success: true,
            data: result
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
};

const getProductAnalysis =  async (req, res) => {
    try{
        const result = await Product.aggregate([
            {
                $match: {
                    category: "Electronics"
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" },
                    avgPrice: { $avg: "$price" },
                    maxPrice: { $max: "$price" },
                    minPrice: { $min: "$price" }
                }
            },
            {
                $sort: { totalProducts: -1 } // Sort by totalProducts in descending order
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field
                    totalRevenue: 1,
                    avgPrice: 1,
                    maxPrice: 1,
                    minPrice: 1,
                    priceRange : {
                        $subtract: ["$maxPrice", "$minPrice"]
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            data: result 
        })
    } catch(e){
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
} 

const insertSampleProducts = async(req, res)=>{
    try{
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"],
            },
            {
                name: "Smartphone",
                category: "Electronics",
                price: 699,
                inStock: true,
                tags: ["mobile", "tech"],
            },
            {
                name: "Headphones",
                category: "Electronics",
                price: 199,
                inStock: false,
                tags: ["audio", "tech"],
            },
            {
                name: "Running shoes",
                category: "Sports",
                price: 89,
                inStock: true,
                tags: ["footwear", "running"],
            },
            {
                name: "Hovel",
                category: "Books",
                price: 15,
                inStock: true,
                tags: ["fiction", "bestseller"],
            },
        ];

        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`,
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Some error occured!'
        });
    }
};

module.exports = {insertSampleProducts, getProductStats, getProductAnalysis};