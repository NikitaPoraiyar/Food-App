import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    name: 
    { 
        type: String, 
        required: true 
    },
    chairs: { 
        type: String, 
        required: true 
    }
});

export default mongoose.model('Table', tableSchema);
