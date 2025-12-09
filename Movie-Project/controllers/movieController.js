const { log } = require('console');
const Movie = require('../models/Movie');

const fs = require('fs');

const path = require('path');

exports.indexPage = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.render('index', {movies});
    }
    catch(err){
        console.log(err);        
    }
}

exports.createMovieForm = async (req, res) => {
    res.render('add-movie');
}

exports.createMovie = async (req, res) => {
    const {title, languages, genre, rating, duration, desc} = req.body;
    await Movie.create({
            title,
            languages,
            genre,
            rating,
            duration,
            desc,
            poster : req.file ? req.file.filename : null
    });
    res.redirect('/movies');
}

exports.getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.render('view-all-movie', {movies});
    }
    catch(err){
        console.log(err);        
    }
}

exports.getMovieDetails = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        console.log(movie);
        
        res.render('movie-detail', {movie});
    }
    catch(err){
        console.log(err);        
    }
}

exports.editMovieForm = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.render('edit-movie',{movie});
    }
    catch(err){
        console.log(err);        
    }
}

exports.updateMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        let posterName = movie.poster;
        if(req.file){
            fs.unlinkSync(`public/uploads/${movie.poster}`);
            posterName = req.file.filename;
        }

        movie.title = req.body.title;
        movie.languages = req.body.languages;
        movie.genre = req.body.genre;
        movie.rating = req.body.rating;
        movie.duration = req.body.duration;
        movie.poster = posterName;
        movie.desc = req.body.desc;

        await movie.save();
            
        res.redirect('/movies/viewAllMovie');
    }
    catch(err){
        console.log(err);        
    }
}

exports.deleteMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        fs.unlinkSync(`public/uploads/${movie.poster}`);

        await Movie.findByIdAndDelete(movie._id);

        res.redirect('/movies/viewAllMovie');
    }
    catch(err){
        console.log(err);        
    }
}