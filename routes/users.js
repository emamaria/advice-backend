
const { Router } = require('express');
const { check } = require('express-validator');
const {getUsers, getUser, createUser, deleteUser, updateUser} = require('../controllers/users')
const {fieldsValidation} = require("../middlewares/fields-validation");
const { validateJWT } = require('../middlewares/jwt-validation');

const router = Router();


router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required with correct format').isEmail(),
    check('password', 'Password requires at least 8 characters that contains 1 number, 1 special character, 1 uppercase and 1 lowercase').isStrongPassword(),
    ], fieldsValidation, createUser)

router.put('/:id',validateJWT,[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required with correct format').isEmail(),
    check('password', 'Password requires at least 8 characters that contains 1 number, 1 special character, 1 uppercase and 1 lowercase').isStrongPassword(),
    ],fieldsValidation, updateUser)

router.delete('/:id',validateJWT, deleteUser)


module.exports = router;