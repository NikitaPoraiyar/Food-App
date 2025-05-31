import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import productsRoute from './routes/products.js';
import saveSelectedProductsRoute from './routes/saveSelectedProducts.js';
import userRoute from './routes/user.js';
import orderRoute from './routes/order.js';
import tableRoute from './routes/table.js';
import chefRoute from './routes/chef.js';
import Chef from './models/chef.js';


const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();
// app.use(cors());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// };

// connectDB();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        await initializeChefs(); // ← initialize default chefs here

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

connectDB();



const initializeChefs = async () => {
    const chefs = await Chef.find();
    if (chefs.length === 0) {
        const defaultChefs = ['Manesh', 'Pritam', 'Yash', 'Tenzen'].map(name => ({
            name,
            orderTaken: 0
        }));
        await Chef.insertMany(defaultChefs);
        console.log('Default chefs added');
    } else {
        console.log('Chefs already exist, skipping initialization.');
    }
};


app.use('/api', productsRoute);
app.use('/api', saveSelectedProductsRoute);
app.use('/api', userRoute);
app.use('/api', orderRoute);
app.use('/api', tableRoute);
app.use('/api', chefRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`);
});
