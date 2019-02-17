const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill: { type: "String" },
    skill_slug: { type: "String" },
    status: { type: String, default: "active" }
});

skillSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = {
    getModel: mongoose.model("Skill", skillSchema)
};