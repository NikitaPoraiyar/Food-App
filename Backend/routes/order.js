import express from 'express';
import Order from '../models/order.js';
import Chef from '../models/chef.js';

const router = express.Router();

const assignChef = async () => {
const chef = await Chef.findOne().sort({ orderTaken: 1 }); 
    if (!chef) throw new Error('No chefs found');

    chef.orderTaken += 1;
    await chef.save();
    return chef;
};

router.post('/order', async (req, res) => {
    try {
        console.log("Order Data Received:", req.body);
        const { user, dineOption, selectedProducts, tableNumber } = req.body;

        if (!user || !dineOption || !selectedProducts?.length) {
            return res.status(400).json({ error: 'Missing fields in order data' });
        }
        const maxPrepTime = Math.max(...selectedProducts.map(p => p.preparationTime)) * 60 * 1000;
        const prepEndTime = new Date(Date.now() + maxPrepTime); 

        const chefs = await Chef.find().sort({ orderTaken: 1 });

        if (chefs.length === 0) {
            return res.status(500).json({ message: 'No chefs available' });
        }

        const assignedChef = chefs[0];

        const newOrder = new Order({ user, dineOption, selectedProducts, tableNumber, status: 'processing', chef: assignedChef._id });
        await newOrder.save();

        assignedChef.orderTaken += 1;
        await assignedChef.save();

        setTimeout(async () => {
            const chefToUpdate = await Chef.findById(assignedChef._id);
            if (chefToUpdate) {
                chefToUpdate.orderTaken = Math.max(0, chefToUpdate.orderTaken - 1);
                await chefToUpdate.save();
            }
        }, maxPrepTime);

        res.status(200).json({ message: 'Order saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving order' });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});


router.get('/orders/summary', async (req, res) => {
    try {
        const orders = await Order.find();

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, order) => {
            const orderTotal = order.selectedProducts?.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0) || 0;
            return acc + orderTotal;
        }, 0);

        let dineInOrdersCount = 0;
        let takeAwayOrdersCount = 0;

        orders.forEach(order => {
            if (order.dineOption === 'Dine In') dineInOrdersCount++;
            if (order.dineOption === 'Take Away') takeAwayOrdersCount++;
        });

        res.status(200).json({
            totalOrders,
            totalRevenue,
            dineInOrdersCount,
            takeAwayOrdersCount
        });

    } catch (err) {
        console.error('Error fetching order summary:', err);
        res.status(500).json({ message: 'Error fetching order summary' });
    }
});

router.get('/orders/revenue/daily', async (req, res) => {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);

        const dailyRevenue = await Order.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        { $unwind: '$selectedProducts' },
        { 
            $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            totalRevenue: { $sum: { $multiply: ['$selectedProducts.price', '$selectedProducts.quantity'] } }
            }
        },
        { $sort: { _id: 1 } }
        ]);

        res.json(dailyRevenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch daily revenue' });
    }
});

router.get('/orders/revenue/weekly', async (req, res) => {
    try {
        const now = new Date();
        const fourWeeksAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28);

        const weeklyRevenue = await Order.aggregate([
        {
            $match: { createdAt: { $gte: fourWeeksAgo } }
        },
        {
            $unwind: '$selectedProducts'
        },
        {
            $group: {
            _id: { 
                $isoWeek: '$createdAt'  
            },
            totalRevenue: { 
                $sum: { 
                $multiply: ['$selectedProducts.price', '$selectedProducts.quantity'] 
                } 
            }
            }
        },
        {
            $sort: { '_id': 1 } 
        }
        ]);

        res.json(weeklyRevenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch weekly revenue' });
    }
});

router.get('/orders/revenue/monthly', async (req, res) => {
    try {
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

        const monthlyRevenue = await Order.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        { $unwind: '$selectedProducts' },
        { 
            $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            totalRevenue: { $sum: { $multiply: ['$selectedProducts.price', '$selectedProducts.quantity'] } }
            }
        },
        { $sort: { _id: 1 } }
        ]);

        res.json(monthlyRevenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch monthly revenue' });
    }
});


export default router;
