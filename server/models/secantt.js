let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    x1 : {type: Number ,required : true} ,
    x2 : {type: Number ,required : true}
    
});

let secantt = mongoose.model('secantt',userSchema5);
module.exports = secantt;