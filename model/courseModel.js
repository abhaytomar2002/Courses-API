const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    name : {type : String , required :true}, 
    imageURL : {type : String , required :true},
    universityName : {type : String , required :true},
    facultyProfile : String,
    duration : {type : Number , required :true},
    price: {type: Number, required: true},
    certificate: {type:String, reuired: true},
    eligibilityCriteria: {type: String, required: true}
});

module.exports = mongoose.model("courseDetails",courseSchema);

