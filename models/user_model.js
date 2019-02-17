const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: { type: "String", required: true, unique: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    first_name: { type: "String" },
    last_name: { type: "String" },
    dob: { type: "String" },
    status: { type: String, default: "active" }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

userSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = {
    getModel: mongoose.model('User', userSchema)
};