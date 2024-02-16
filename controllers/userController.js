const User = require('../models/User');

const passwordHash = require('password-hash')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const env = process.env;

const createToken = (id) => {
    return jwt.sign({id},env.JWT_SECRET_KEY);
}

// sign up user
const signupUser = async (req, res) => {
    const {name, email, password} = req.body;

    const emptyFilds = [];

    if(!name) {
        emptyFilds.push('name');
    }
    if(!email) {
        emptyFilds.push('email');
    }
    if(!password) {
        emptyFilds.push('password');
    }
    if(emptyFilds.length > 0) {
        return res.status(400).json({emptyFilds: emptyFilds, error: "All filds must be filed"})
    }

    if(!validator.isEmail(email)) {
        return res.status(400).json({error: "Your email is not valid"})
    }

    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({error: "Your password is weak"})
    }

    const exist = await User.findOne({email});
    if(exist) {
        return res.status(400).json({error: "This email already exist"})
    }

    const hash = passwordHash.generate(password);

    const user = await User.create({name, email, password: hash});

    try {
        const token = createToken(user._id);

        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// log in user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const emptyFilds = [];

    if(!email) {
        emptyFilds.push('email');
    }
    if(!password) {
        emptyFilds.push('password');
    }
    if(emptyFilds.length > 0) {
        return res.status(400).json({emptyFilds: emptyFilds, error: "All filds must be filed"})
    }

    const user = await User.findOne({email});

    if(!user) {
        emptyFilds.push("email");
        return res.status(400).json({emptyFilds: emptyFilds, error: "Incorecct email"})
    }

    const match = passwordHash.verify(password, user.password);

    if(!match) {
        emptyFilds.push("password");
        return res.status(400).json({emptyFilds: emptyFilds, error: "Incorecct password"})
    }

    try {
        const token = createToken(user._id);

        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// users info
const infoUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({error: err})        
    }
}

// user info
const infoUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({error: err.message})        
    }
}

// upload photo
const uploadPhoto = async (req, res) => {
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
};

// update user info
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password, addedPhoto, contact, BIO } = req.body;

    const hash = passwordHash.generate(password);

    const data = { name, password:hash, photo:addedPhoto, contact, BIO };
    
    try {
        const user = await User.findByIdAndUpdate(id, data)

        const token = createToken(user._id);

        res.status(200).json({user, token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    signupUser,
    loginUser,
    infoUsers,
    uploadPhoto,
    updateUser,
    infoUser
}