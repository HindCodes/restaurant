import dbConnect from "../../../utilities/mongo.js"
import Product from "../../../models/product"

export default async function handler(req, res) {
    const {method, cookies} = req;

    const token = cookies.token

    dbConnect();

    if(method === "GET") {
        try {
            const products = await Product.find();
            res.status(200).json(products);

        } catch (err) {
            res.status(500).json(err);
        }
    }

    if(method === "POST") {
        if(!token || token !== process.env.token){
            return req.status(401).json("Not authenticated!")
        }
        try {
            const prodcut = await Product.create(req.body);
            res.status(201).json()

        } catch (err) {
            res.status(500).json(err);
        }
    }
}