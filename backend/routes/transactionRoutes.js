const express = require('express')
const router = express.Router()
const {addTransaction, getAllTransaction, editTransaction, deleteTransaction} = require("../controllers/tranAuth")


router.post('/get-transaction', getAllTransaction);
router.post('/add-transaction', addTransaction);
router.post('/edit-transaction', editTransaction);
router.post('/delete-transaction', deleteTransaction);

module.exports = router