const { Router } = require('express');
const { check } = require('express-validator')
const {fieldsValidation} = require("../middlewares/fields-validation")
const {login, renewToken} = require("../controllers/auth");
const { validateJWT } = require('../middlewares/jwt-validation');

const router = Router();


router.post('/login',[
    check('email', 'Email is required with correct format').isEmail(),
    check('password', 'Password requires at least 8 characters that contains 1 number, 1 special character, 1 uppercase and 1 lowercase').isStrongPassword(),
    ], fieldsValidation, login)


router.get('/renew', validateJWT, renewToken)

module.exports = router