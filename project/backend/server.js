const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = require('./config/database/connectionDB')

const app = express();
const port = 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Подключение к базе данных MongoDB
connectDB.connectionDB(process.env.DB)

// Определение схемы и модели для пользователей
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);


// Маршрут для регистрации пользователя
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
  
    newUser.save();
    console.log('user create')
    res.redirect('http://127.0.0.1:5500/frontend/pages/Login.html')
});


app.get('/register', (req, res) => {
    res.send('reg')
})
// Маршрут для авторизации пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password }, (err, user) => {
        if (err) {
            res.status(500).send('Error logging in');
            throw err;
        }
        if (user) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
