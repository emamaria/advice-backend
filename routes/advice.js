
const { Router } = require('express');
const { check } = require('express-validator')
const {fieldsValidation} = require("../middlewares/fields-validation")

const {getAllAdvice, getOneAdvice, createAdvice, deleteAdvice, updateAdvice} = require('../controllers/advice');
const { validateJWT } = require('../middlewares/jwt-validation');
const upload = require('../middlewares/uploadImage')

const router = Router();


router.get('/', getAllAdvice)

router.get('/:id', getOneAdvice)

router.post('/',validateJWT, upload.single('image'),[
    check('advice', 'Advice is required').not().isEmpty(),
    check('userId', 'userId is required').not().isEmpty(),
    ], fieldsValidation, createAdvice)

router.patch('/:id', validateJWT, upload.single('image'), check('advice').optional().not().isEmpty().withMessage('Advice is required'),fieldsValidation, updateAdvice)

router.delete('/:id',validateJWT, deleteAdvice)


module.exports = router;