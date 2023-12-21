
const { Router } = require('express');

const {oneAdviceByUserId} = require('../controllers/adviceByUserId');

const router = Router();




router.get('/:id', oneAdviceByUserId)


module.exports = router;