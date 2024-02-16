const express = require('express');

const router = express.Router();

// import controllers
const { uploadPhotoBylink, uploadPhotoByFile, createNewPlace, getAllPlaces, getSinglePlace, updatePlace, getAllPlacesUser, removePlace } = require("../controllers/placeController");

// import middlewares
const photosMulter = require('../middlewares/photosMulter');
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth)

router.get('/', getAllPlaces)

router.get('/user', getAllPlacesUser)

router.get('/:id', getSinglePlace)

router.post('/upload-by-link', uploadPhotoBylink);

router.post('/upload-by-file', photosMulter.array('files', 100), uploadPhotoByFile)

router.post('/create', createNewPlace);

router.put('/update/:id', updatePlace)

router.delete('/remove/:id',removePlace)

module.exports = router