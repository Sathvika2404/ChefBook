const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    famousAt: {
        type: [String]
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        text: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

recipeSchema.index({ title: 'text', ingredients: 'text', instructions: 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
