const { Router } = require('express');
const { check } = require('express-validator');

const {fieldsValidation} = require("../middlewares/fields-validation");
const { validateJWT } = require('../middlewares/jwt-validation');
const {removeLike} = require('../controllers/removeLike')
const router = Router();





router.patch('/:id',validateJWT,[
    check('removelikeUsersId', 'User id is required').not().isEmpty(),
    ], fieldsValidation, removeLike)






module.exports = router;