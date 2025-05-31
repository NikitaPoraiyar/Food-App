import mongoose from 'mongoose';

const selectedProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    preparationTime: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }

});

export default mongoose.model('SelectedProduct', selectedProductSchema);

