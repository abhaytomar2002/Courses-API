const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const Courses = require("../model/courseModel");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer"); 
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

router.post("/", upload.single("imageURL"),checkAuth, async(req,res) =>{
    try {
        
        let course = await Courses.create(req.body);
        return res.send(course);

    } catch (e) {
        return res.send(e.message);
    }
});

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


router.get("/",  checkAuth, async(req,res) =>{
    try {
        
        let course = await Courses.findOne({course_id :req.params.id}).lean().exec()
        return res.send(course)

    } catch (e) {
        return res.send(e.message);
    }
});


router.patch("/", checkAuth, async(req,res)=>{
    try {
        let course = await Courses.updateOne(req.params.id,req.body , {new:true})
        return res.send(course)
    } catch (e) {
        return res.send(e.message)
    }
});

module.exports = router;
