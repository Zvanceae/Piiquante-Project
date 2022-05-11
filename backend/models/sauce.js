const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    heat: { type: Number, required: true, min: 1, max: 10 },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: false },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }],
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);