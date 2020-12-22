var mongoose    = require('mongoose');

var reservationSchema = new mongoose.Schema({
    uname:      String,
    email:      String,
    contact:    String,
    address:    String,
    city:       String,
    state:      String,
    zip:        String,
    date:       Date,
    bathroom:   String,
    beds:       Number,
    food:       String,
})

module.exports = mongoose.model("reservations", reservationSchema);
