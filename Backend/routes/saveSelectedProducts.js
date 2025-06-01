import express from 'express';
import SelectedProduct from '../models/SelectedProduct.js';

const router = express.Router();

router.get('/selected-products', async(req, res) => {
    try {
        const products = await SelectedProduct.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching selected products' });
    }
});

router.post('/selected-products', async (req, res) => {
    try {
        await SelectedProduct.deleteMany(); 

        await SelectedProduct.insertMany(req.body);
        res.status(200).json({ message: 'Selected products saved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving to model' });
    }
});

export default router;
