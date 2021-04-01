const express = require('express');
const thingRouter = require('./thing.router');
const router = express.Router();

router.use('/thing', thingRouter);

module.exports = router;
