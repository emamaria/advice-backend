const { Router } = require('express');
const { check } = require('express-validator');

const {fieldsValidation} = require("../middlewares/fields-validation");
const { validateJWT } = require('../middlewares/jwt-validation');
const {addLike} = require('../controllers/addLike')
const router = Router();





router.patch('/:id',validateJWT,[
    check('likedUsersId', 'User id is required').not().isEmpty(),
    ], fieldsValidation, addLike)




module.exports = router;