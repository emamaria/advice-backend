
const { Router } = require('express');

const {getAllAdvice, getOneAdvice, createAdvice, deleteAdvice, updateAdvice} = require('../controllers/advice')


const router = Router();


router.get('/', getAllAdvice)

router.get('/:id', getOneAdvice)

router.post('/', createAdvice)

router.put('/:id', updateAdvice)

router.delete('/:id', deleteAdvice)


module.exports = router;