const express = require('express');
const router = express.Router();

const { signupUser, loginUser, infoUsers, uploadPhoto, updateUser, infoUser } = require('../controllers/userController');

// import middlewares
const photosMulter = require('../middlewares/photosMulter');

// get users info
router.get('/', infoUsers);

// get user info
router.get('/:id', infoUser);

// sign up user
router.post('/signup', signupUser);

// log in user
router.post('/login', loginUser);

// upload photo
router.post('/upload', photosMulter.array("files",100), uploadPhoto)

// edit user info
router.patch('/update/:id', updateUser)

module.exports = router;