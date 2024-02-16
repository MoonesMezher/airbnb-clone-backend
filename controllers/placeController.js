const imageDownloader = require('image-downloader'); // to post image by link 
const fs = require('fs'); // to rename in server

// import models
const Place = require('../models/Place');

// get all places 
const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find({});

        res.status(200).json(places)
    } catch (err) {
        res.status(400).json({error: err})        
    }
}

// get all places to user
const getAllPlacesUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const places = await Place.find({userId});
        
        res.status(200).json(places)
    } catch(err) {
        res.status(400).json({error: err})
    }
}

// get place details
const getSinglePlace = async (req, res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id);
        
        res.status(200).json(place)
    } catch(err) {
        res.status(400).json({error: err})
    }
}

// upload photo by link
const uploadPhotoBylink = async (req, res) => {
    const { photoLink } = req.body;

    console.log(photoLink);
    // const link2 = "https://i.pinimg.com/474x/11/17/4f/11174f9455ed089c635043870726300a.jpg";
    const newName = "photo" + Date.now() + ".jpg";
    
    imageDownloader.image({
        url: photoLink,
        dest: `C:/Users/97150/OneDrive/Desktop/Airbnb Clone/server/uploads/${newName}`
    }).then(({ filename }) => {
        console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error("Err: ", err));;
    res.json({newName});
}

// upload photo as file frm pc
const uploadPhotoByFile = async (req, res) => {
    const files = req.files;

    const uploadedFiles = []

    for (let i = 0; i < files.length; i++) {
        const { path, originalname } = files[i];
        const extinsion = originalname.split(".")[1];
        const newPath = (`${path}.${extinsion}`)

        fs.renameSync(path, newPath);

        uploadedFiles.push(newPath.replace('uploads\\', ""))
    }
    try {
        res.status(200).json(...uploadedFiles)
    } catch (err) {
        res.status(400).json({error: err})        
    }
}

// post a new place
const createNewPlace = async (req, res) => {
    const {title, address, checkIn, checkOut, description, extraInfo, maxGuests, per, perks, price, addedPhoto, rooms, beds} = req.body;
    const userId = req.user.id;
    const data = {title, address, checkIn, checkOut, description, extraInfo, maxGuests, per, perks, price, photos:addedPhoto, userId, rooms, beds}
    
    const emptyFields = [];

    if(!title) {
        emptyFields.push("title")
    }
    if(!address) {
        emptyFields.push("address")
    }
    if(!addedPhoto || addedPhoto?.length == 0) {
        emptyFields.push("photos")
    }
    if(!description) {
        emptyFields.push("description")
    }
    if(!extraInfo) {
        emptyFields.push("extraInfo")
    }
    if(!checkIn) {
        emptyFields.push("checkIn")
    }
    if(!checkOut) {
        emptyFields.push("checkOut")
    }
    if(!price) {
        emptyFields.push("price")
    }
    if(!rooms) {
        emptyFields.push("rooms")
    }
    if(!beds) {
        emptyFields.push("beds")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "You must fill all fields", emptyFields})
    }

    try {
        const place = await Place.create(data)
    
        return res.status(200).json(place)
    } catch (err) {
        return res.status(400).json({error: err.message})
    }

}

// update a place
const updatePlace = async (req, res) => {
    const { id } = req.params;
    const {title, address, checkIn, checkOut, description, extraInfo, maxGuests, per, perks, price, addedPhoto, rooms, beds} = req.body
    const userId = req.user.id;
    const data = {title, address, checkIn, checkOut, description, extraInfo, maxGuests, per, perks, price, photos:addedPhoto, userId, rooms, beds}

    const emptyFields = [];

    if(!title) {
        emptyFields.push("title")
    }
    if(!address) {
        emptyFields.push("address")
    }
    if(!addedPhoto || addedPhoto?.length == 0) {
        emptyFields.push("photos")
    }
    if(!description) {
        emptyFields.push("description")
    }
    if(!extraInfo) {
        emptyFields.push("extraInfo")
    }
    if(!checkIn) {
        emptyFields.push("checkIn")
    }
    if(!checkOut) {
        emptyFields.push("checkOut")
    }
    if(!price) {
        emptyFields.push("price")
    }
    if(!rooms) {
        emptyFields.push("rooms")
    }
    if(!beds) {
        emptyFields.push("beds")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "You must fill all fields", emptyFields})
    }

    try {
        const place = await Place.findByIdAndUpdate(id, data)
        
        res.status(200).json(place)
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

// remove place 
const removePlace = async (req, res) => {
    const { id } = req.params;

    try {
        const place = await Place.findByIdAndDelete(id)
        
        return res.status(200).json(place)
    } catch (err) {
        return res.status(400).json({error: err.message})
    }
}

module.exports = {
    uploadPhotoBylink,
    uploadPhotoByFile,
    createNewPlace,
    getAllPlaces,
    getAllPlacesUser,
    getSinglePlace,
    updatePlace,
    removePlace
};