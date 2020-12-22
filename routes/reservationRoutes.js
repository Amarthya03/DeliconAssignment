const e = require('express');
var express = require('express');
const { update } = require('../models/reservations');
const reservations = require('../models/reservations');
var router  = express.Router();

var Reservations = require("../models/reservations");
const { route } = require('./indexRoutes');


router.get('/reservation', isLoggedIn, (req, res) => {
    Reservations.find({}, (err, reservations) => {
        if(err) {
            console.log(err);
        } else {
            res.render('reservations', {reservations: reservations});
        }
    })
})

router.get('/add', isLoggedIn, (req, res) => {
    res.render('addreservation');

})

router.post("/add", isLoggedIn, (req, res) => {
    var reservation = req.body.reservation;
    Reservations.create(reservation, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/reservation');
        }
    })
})

router.get('/reservation/:id', isLoggedIn, (req, res) => {
    Reservations.findById(req.params.id, (err, found) => {
        if(err) {
            console.log(err);
        } else {
            res.render("reserved", {reservation: found});
        }
    })
})

router.get('/reservation/:id/edit', isLoggedIn, (req, res) => {
    Reservations.findById(req.params.id, (err, foundReservation) => {
        if(err) {
            console.log(err);
        } else {
            res.render("editreservation", {reservation: foundReservation});
        }
    })
})

router.put("/reservation:id", isLoggedIn, (req, res) => {
    var data = req.body.reservation;
    Reservations.findByIdAndUpdate(req.params.id, data, (err, updated) => {

    })
})

router.delete("/reservation/:id", isLoggedIn, (req, res) => {
    Reservations.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
            res.redirect("/reservation");
        } else {
            res.redirect("/reservation/" + req.params.id);
        }
    })
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;