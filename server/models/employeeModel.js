const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: String,
    image: String,
    role: String,
    salary: String
});

module.exports = new mongoose.model('employees', employeeSchema);