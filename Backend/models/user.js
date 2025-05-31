import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: function () {
            return this.dineOption === 'Take Away';
        }
    },
    address:{
        type: String,
        required: function () {
            return this.dineOption === 'Take Away';
        }
    },
    phone:{
        type: String,
        required: function () {
            return this.dineOption === 'Take Away';
        }
    },
});


export default mongoose.model('User', userSchema);
