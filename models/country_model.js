const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country: { type: "String" },
    country_slug: { type: "String" },
    status: { type: String, default: "active" }
});

countrySchema.set('toJSON', { getters: true, virtuals: true });

module.exports = {
    getModel: mongoose.model("Country", countrySchema)
};