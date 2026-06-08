const express = require('express');
const router = express.Router();
const applicationController = require('../Controllers/applicationController');

router.post('/', applicationController.submitApplication);

module.exports = router;
