const express = require('express');
const router = express.Router();

// controller
// const { getTransactions } = require('../controllers/transactions');
//
// router.route('/')
//     .get(getTransactions)
//     .post(addTransaction);
//
// router.route('/:id').delete(deleteTransaction);

router.get('/', (req, res) => res.send('Hi, from the server'));

module.exports = router;