const express = require('express');
const { createEmployee, getEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeeControllers');
const verifyJWT = require('../middlewares/verifyJWT');
const router = express.Router();

router.get('/employee', verifyJWT, getEmployee);
router.post('/employee', verifyJWT, createEmployee);
router.put('/employee/:id', verifyJWT, updateEmployee);
router.delete('/employee/:id', verifyJWT, deleteEmployee);

module.exports = router;