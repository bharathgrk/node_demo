const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
    session_id: { type: String, required: true },
    status: { type: String, default: "active" }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

loginSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = {
    getModel: mongoose.model("Login", loginSchema)
};