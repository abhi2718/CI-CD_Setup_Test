const mongoose = require('mongoose');

const connectWithDB = () => {
  mongoose.connect(process.env.MONGODB_URI)
};

module.exports = {
    connectWithDB
}