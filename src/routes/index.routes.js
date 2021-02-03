const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const profileRouter = require('./profile.routes.js');
const skillsRouter = require('./skills.routes.js');

router.use('/admins', adminRouter);
router.use('/profile', profileRouter);
router.use('/skills', skillsRouter)

module.exports = router;