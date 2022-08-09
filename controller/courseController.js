//npm 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const Courses = require("../model/courseModel");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer"); 
//storing images uploaded via api request
const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "./uploads");
    },
    filename: function(req, res, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage});

app.use(bodyParser.urlencoded({extended:true}));

//post request
router.post("/", upload.single("imageURL"),checkAuth, async(req,res) =>{
    try {
        
        let course = await Courses.create(req.body);
        return res.send(course);

    } catch (e) {
        return res.send(e.message);
    }
});

//Delete request
router.delete("/" , checkAuth, async(req,res) =>{
    console.log(req.body);
    try {
        
        let course = await Courses.deleteOne(req.body);
        return res.send(course);

    } 
    catch (e) {
        return res.send(e.message)
    }
});


//get request
router.get("/",  checkAuth, async(req,res) =>{
    try {
        
        let course = await Courses.findOne({course_id :req.params.id}).lean().exec()
        return res.send(course)

    } catch (e) {
        return res.send(e.message);
    }
});

//Patch request to update
router.patch("/", checkAuth, async(req,res)=>{
    try {
        let course = await Courses.updateOne(req.params.id,req.body , {new:true})
        return res.send(course)
    } catch (e) {
        return res.send(e.message)
    }
});

//connecting with database
module.exports = router;
