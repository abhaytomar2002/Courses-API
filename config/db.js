//connecting with MongoDB using mongoose
const mongoose = require("mongoose");

const connect = () => {

    return mongoose.connect("mongodb+srv://abhaytomar2002:yDXDS15mg58zBTvG@cluster0.rvkou.mongodb.net/courseDB?retryWrites=true&w=majority")
};

module.exports = connect;
