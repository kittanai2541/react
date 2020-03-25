let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    degree : {type: Number ,required : true},
    x0 : {type: Number ,required : true},
    h : {type: Number ,required : true}
});

let forward = mongoose.model('forward',userSchema5);
module.exports = forward;