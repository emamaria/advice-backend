
const { Router } = require('express');

const {getUsers, getUser, createUser, deleteUser, updateUser} = require('../controllers/users')


const router = Router();


router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)


module.exports = router;