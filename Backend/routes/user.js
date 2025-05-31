import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/user', async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const user = new User({ name, address, phone });
        await user.save();
        res.status(200).json({ message: 'User info saved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving user info' });
    }
});

export default router;
