import express from 'express';
import Chef from '../models/chef.js';

const router = express.Router();

router.get('/chefs', async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch chefs' });
    }
});

export default router;
