
//Requiring jsonwebtoken for authentication
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];//token from header section of postman
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);//token verification
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}
