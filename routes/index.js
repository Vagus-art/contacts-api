const { Router } = require('express');
const router = Router();
const contactRoutes = require("./contacts");

router.use('/contacts',contactRoutes);

module.exports = router;