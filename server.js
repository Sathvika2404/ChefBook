const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/recipe_platform', {
    useNewUrlParser: false,
    useUnifiedTopology: false
});

app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
        return res.redirect('/login');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.redirect('/dashboard');
        } else {
            res.redirect('/login');
        }
    } catch {
        res.redirect('/login');
    }
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/submit', (req, res) => {
    res.render('submit_recipe');
});

app.get('/recipes', (req, res) => {
    res.render('recipes');
});

app.get('/search', (req, res) => {
    res.render('search_results');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use(express.static('public'));
