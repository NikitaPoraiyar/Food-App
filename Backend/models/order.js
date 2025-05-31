import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        name: 
        { 
            type: String, 
            required: function () {
                return this.dineOption === 'Take Away';
            },
        },
        address: 
        { 
            type: String, 
            required: function () {
                return this.dineOption === 'Take Away';
            }, 
        },
        phone: { 
            type: String, 
            required: function () {
                return this.dineOption === 'Take Away';
            }, 
        }
    },
    dineOption: 
    { 
        type: String, 
        enum: ['Dine In', 'Take Away'], 
        required: true 
    },
    selectedProducts: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            preparationTime: { type: Number, required: true }
        }
    ],
    status: {
        type: String,
        enum: ['processing', 'done'],
        default: 'processing'
    },
    tableNumber: {
        type: String
    },
    createdAt: { type: Date, default: Date.now },
    day: { type: String }

});

orderSchema.pre('save', function (next) {
    if (!this.day) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const currentDate = this.createdAt || new Date();
        this.day = days[currentDate.getDay()];
    }
    next();
});

export default mongoose.model('Order', orderSchema);
