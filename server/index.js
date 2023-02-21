const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoute');
const employeeRoutes = require('./routes/employeeRoute');

require('./config/db.config');

// middle wares
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/', userRoutes);
app.use('/', employeeRoutes);


// route errro handling
app.use((req, res, next) => {
    res.send('Route is not found');
});


// server error handling
app.use((err, res, req, next) => {
    res.send('Something is broken')
});


app.listen(port, () => console.log(`server is running on port ${port}`));