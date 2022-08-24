//connecting with MongoDB using mongoose
const mongoose = require("mongoose");

const connect = () => {

    return mongoose.connect("mongodb+srv://<username>:<password>@cluster0.rvkou.mongodb.net/courseDB?retryWrites=true&w=majority")
};

module.exports = connect;
