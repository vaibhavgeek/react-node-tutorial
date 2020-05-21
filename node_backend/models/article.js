const mongoose = require('mongoose');  
    const Schema = mongoose.Schema;
    let article = new Schema({  
        content: String,
        author: String 
    });
    module.exports = mongoose.model('article', article);