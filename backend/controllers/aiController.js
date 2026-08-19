import { model } from "../config/gemini.js";
import Product from "../models/productModel.js";

export const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

        const products = await Product.find().limit(20);

        const productText = products
            .map((p) => `${p.name} ₹${p.price}`)
            .join("\n");

        const prompt = `

You are ShopNex AI.

Products:

${productText}

User:

${message}

Recommend only available products.

`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        res.json({
            success: true,
            reply: response
        });

    } catch (err) {

        res.json({
            success: false,
            message: err.message
        });

    }

}