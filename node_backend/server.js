const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const articleRoutes = express.Router();
const PORT = 4000;
let article = require('./models/article.js');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/art', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
articleRoutes.route('/articles/').get(function(req, res) {
    article.find(function(err, art) {
        if (err) {
            res.json(err);
        } else {
            res.json(art);
        }
    });
});
articleRoutes.route('/article/:id').get(function(req, res) {
    let id = req.params.id;
    article.findById(id, function(err, article) {
        res.json(article);
    });
});
 articleRoutes.route('/article/update/:id').post(function(req, res) {  
        Article.findById(req.params.id, function(err, art) {  
            if (!art)  
                res.status(404).send("data is not found");  
            else  
                art.content = req.body.content;  
                art.author = req.body.author;  
            art.save().then(todo => {  
                    res.json('Article updated!');  
                })  
                .catch(err => {  
                    res.status(400).send("Update not possible");  
                });  
        });  
    }); 
articleRoutes.route('/article/new').post(function(req, res) {
    console.log(req.body)
    let articleo = new article({ content: req.body.content, author: req.body.author });
    articleo.save()
        .then(articleo => {
            res.status(200).json({'article': 'article added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new article failed');
        });
});
app.use('/', articleRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});