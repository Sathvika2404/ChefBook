const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipe_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Listen for MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');
});
