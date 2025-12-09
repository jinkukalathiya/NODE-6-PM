const express = require('express');

const route = express.Router();

const multer = require('multer');

const path = require('path');

const movieCtl = require('../controllers/movieController');

// Movie Poster Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"public/uploads");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File Filter
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const upload= multer({
    storage : storage,
    fileFilter : fileFilter
});

route.use(express.static('public'));

route.use(express.urlencoded());

route.get('/', movieCtl.indexPage);

route.get('/addMovie', movieCtl.createMovieForm);

route.post('/addNewMovie',upload.single('poster'), movieCtl.createMovie);

route.get('/viewAllMovie', movieCtl.getAllMovies);

route.get('/movieDetails/:id', movieCtl.getMovieDetails);

route.get('/edit/:id', movieCtl.editMovieForm);

route.post('/update/:id', upload.single('poster'), movieCtl.updateMovie);

route.get('/delete/:id', movieCtl.deleteMovie);

module.exports = route;