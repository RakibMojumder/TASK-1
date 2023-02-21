const Employees = require('../models/employeeModel');

const createEmployee = async (req, res) => {
    try {
        const employee = req.body;
        await Employees.create(employee);
        res.json({
            success: true,
            message: 'Successfully add employee'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};


const getEmployee = async (req, res) => {
    try {
        const employees = await Employees.find({});
        res.json({
            success: true,
            message: 'Successfully got employees',
            employees
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};


const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedDoc = req.body;
        await Employees.findByIdAndUpdate({ _id: id }, updatedDoc);
        res.json({
            success: true,
            message: 'update successful'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        await Employees.deleteOne({ _id: id });
        res.json({
            success: true,
            message: 'successfully deleted'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { createEmployee, getEmployee, updateEmployee, deleteEmployee };