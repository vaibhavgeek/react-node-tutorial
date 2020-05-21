# Your First SPA in ReactJs, NodeJS

[\[Tutorial Source Code\]](https://github.com/vaibhavgeek/react-node-tutorial) 

Today we are going to build a simple blog application that will help you get started with ReactJS with back-end built over NodeJS The complete tutorial has been split into SIX IMPORTANT steps.

1.  Installing the required tools
    
2.  Understanding NodeJS structure (Back-end of your application)
    
3.  Coding Your APIs
    
4.  Understanding ReactJS structure (Front-end of your application)
    
5.  Designing and Coding your Front-end
    
6.  Grab a good drink and pat yourself on the back for doing an excellent job.
    

## Installing the required tools

![](https://lh3.googleusercontent.com/ms8rpAlP2RFG8MV-2Vo2XVxCPU_bxCdQCXXP63Da8c4LEdmSixPp_zZj4NfZQKYQAl9HbGA40Hv0oIF7xl_VkT5SV2TiAgfYFmBOlsMmLBMBNF4Ea6BT0cUqiODTPJHY8aVeCoyY)


Let’s get our tools installed and start the fire going to get us started with building our Blog Application. We will use ReactJS, NodeJS, Express and MongoDB.

-   Node.js: Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine. Node.js brings JavaScript to the server
    
-   MongoDB: A document-based open source database
    
-   Express: A Fast, unopinionated, minimalist web framework for Node.js
    
-   React: A JavaScript front-end library for building user interfaces  
      
    

Let’s install them on a Debian based system. You can ignore this section if you already have them installed. Fire up the terminal by hitting the keys Cltr+Altr+T and do the following.

  
  
  

Installing NodeJs and NPM

  

```
$ wget https://nodejs.org/dist/v6.9.2/node-v6.9.2-linux-x64.tar.gz

# tar -xf node-v6.9.2-linux-x64.tar.gz --directory /usr/local --strip-components 1
```

Now, we install MongoDB. You can also cloud solution called as mlab.com but for this tutorial, we will use the one on your system instead.

  

```

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

$ sudo bash -c 'echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-4.0.list'

$ sudo apt-get update

$ sudo apt-get install -y mongodb-org
```

If you have some issues with mongodb installation[,check this out](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/). It has very succinct guide on how to setup your MongoDB environment.

## Understanding NodeJS structure (Back-end of your application)

In this section we will deal with only two files. One that defines our model and other that helps us with setting up our HTTP API endpoints. 

 - models/modelname.js 
 This would have the schema of the database. In our case we are going using mongoose database adapter to connect with our MongoDB
 - /server.js
 This would alllow back-end to function. 

The back-end will comprise HTTP endpoints to cover the following use cases:

-   Retrieve the complete list of available blog articles by sending an HTTP GET request
    
-   Retrieve a specific blog article by sending HTTP GET request and provide the specific blogID in addition
    
-   Create a new blog article in the database by sending an HTTP POST request
    
-   Update an article in the database by sending an HTTP POST request  
      
    

Let’s understand how NodeJS along with express communicates to the database (mongoose). We will setup the app.js in our project directory and copy-paste the following code. The code is commented on various sections to help you understand with each and every  line of it. Make sure you have setup MongoDB database correctly while implementing this code. You would need to change database URL in order to make this function correctly.  First we move into our nodejs directory and then we install the requirements. 
```
$ mkdir node_backend
$ cd node_backend
$ npm init
```
Next, we will install express, react, cors, mongoose, nodemon and body-parser.
Express allows us to make HTTP Requests,  React is our front-end framework, mongoose is mongodb adapter and body-parser allows us to parse json. 

```

$ npm install express body-parser cors mongoose react nodemon

```

A long-form version of the same is to use npm install express/react --save but the shorthand version comes in handy very often.

We now create server.js file which would look something lie this. The file has been commented to explain every line of the code. 
 <p class="file-desc"><span>/server.js</span></p>

```
const express = require('express');  
// using express library

const app = express();  
// this creates an instance of express module, enabling the feature
// module.exports. 

const bodyParser = require('body-parser');
// this enables us to parse JSON
  
const cors = require('cors');  
//Cross Origin Resource Sharing, it allows/denies/sets rules for cross domain requests in the application. 

const mongoose = require('mongoose'); 
 // MongoDB adapter for NodeJS
 
const PORT = 4000;
// Where the application would run on Mongoose. 

app.use(cors());  

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true });  
// you need to specify database URL. Make sure this is correctly set up with
// database you are using. 

const connection = mongoose.connection;connection.once('open', function() {  
    console.log("MongoDB database connection established successfully");  
})

app.listen(PORT, function() {  
    console.log("Server is running on Port: " + PORT);  
});

```
Next we will run nodemon server inside the directory to make sure if the code is functional. The express server would be live on http://localhost:4000. 

## Coding our APIs

**![](https://lh3.googleusercontent.com/y6k3ElVdVfVMErWtmFeUZw2sbcC-P5rIi9YpL26uJ__CQQcO_AMFU2Rafz2NX2-HLUmo2iy-6vpo1sVhZ91RAz79JAgGKKUPs4q0ctn7fPvJy7Et_TjN_pandUGpcGIkk8owjCho)**
As we have already mentioned before the APIs that we are going to use. Now let us build the API logic around our application. This would allow the API call made to make changes to our database. 

Our database would only have a single doucment that will allow us to store the blog article. We would need to create the Mongoose Schema for that document. 

<p class="file-desc"><span>models/article.js</span></p>


    const mongoose = require('mongoose');  
    const Schema = mongoose.Schema;
    let Article = new Schema({  
        content: {  
            type: String  
        }, 
        author: {  
            type: String  
        }  
    });
    module.exports = mongoose.model('Article', Article);


Next we will make endpoints in order to update the document in the schema. In order to do so we ***need a express router***. The router will be added as a middleware and will take control of request starting with path /articles:

    const articleRoutes = express.Router();

 **Now we will make an end-point that delivers us all the articles from our database.** 

    articleRoutes.route('/articles').get(function(req, res) {  
	    Article.find(function(err, articles) {  
	    if (err) {  
			console.log(err);  
	    } 
	    else
	     {  
		    res.json(articles);  
		  }  
	  });  
    });


The function which is passed into the call of the method  _get_  is used to handle incoming HTTP GET request on the  _/articles/_  URL path. In this case we’re calling Article.find to retrieve a list of all articles from the MongoDB database. Again the call of the find methods takes one argument: a callback function which is executed once the result is available. Here we’re making sure that the results (available in todos) are added in JSON format to the response body by calling  `res.json(articles)`.


**Now we will create an API which will allow us to get a specific article based on id passed on to it**.
The url would look something like this  /article/:id_. Here :id the path extension is used to retrieve a article item from our database. The implementation logic is straight forward:

    articleRoutes.route('/article/:id').get(function(req, res) {  
	    let id = req.params.id;  
	    Article.findById(id, function(err, art) {  
		    res.json(art);  
	    });  
    });

**Next, let’s add the route which is needed to be able to add new articles by sending a HTTP post request (/article/new):**

    articleRoutes.route('/article/new').post(function(req, res) {  
	    let art = new Article(req.body);  
	    art.save()  
		.then(art => {  
		    res.status(200).json({'art': 'article created successfully'});  
	    })  
	    .catch(err => {  
		    res.status(400).send('creating a new article failed');  
	    });  
    });

The new article is part the the HTTP POST request body, so that we’re able to access it via  _req.body_  and therewith create a new instance of  _Article_ in our Mongoose Database. This new item is then saved to the database by calling the  _save_  method.

**Now we come to our final API which would allow us to update the blog article.**

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
Here is the complete [source code for the nodejs backend file server.js](https://gist.github.com/vaibhavgeek/a2fd9535c3a4f98bf07a4dc4a8e1f3fb#file-server-js) and you can also check out the [mongoose schema mentioned above over here](https://gist.github.com/vaibhavgeek/a2fd9535c3a4f98bf07a4dc4a8e1f3fb#file-article-model).  
## Understanding ReactJS structure
Before we start exploring the structure let's setup our application by creating the react app. You can do this in multiple ways but I suggest you use the trustworthy module 'create-react-app'. It will help you get up running quickly. 
```
$ npm i -g create-react-app
$ create-react-app blog_spa
$ cd blog_spa
```
We would also setup react-router-dom. This would allow us to change the URL without sending a request to the server. Axios would allow us to send and recieve HTTP requests.  
```
$ npm i react-router-dom axios --save
```
There are two main folders that we are largely going to interact with while our development of reactjs SPA. 

 - src
 - public

Now we will delete everything that's present in src and pulic folder. You can do it from GUI or from terminal, it doesn't make a whole lot of difference. 

Now we will create the main page which will work as the skeleton of your application. [aka MasterPage if you are migrating from ASP.NET] React allows us to choose which components to show and which to hide on the basis of url. This is done with the help of ` HashRouter , NavLink and Route` from `react-router-dom` library. We also import the content pages from different components that we want. 
<p class="file-desc"><span>src/main.js</span></p>

    import React, { Component } from "react";
    import {
      Route,
      NavLink,
      HashRouter
    } from "react-router-dom";
    import allPosts from "./allPosts";
    import newArticle from "./newArticle";
    import article from "./article";
    
    class Main extends Component {
      render() {
        return (
          <HashRouter>
            <div>
              <h1>Blog SPA</h1>
              <ul className="header">
                <li><NavLink to="/">All Articles</NavLink></li>
                <li><NavLink to="/new">New Article</NavLink></li>
              </ul>
              <div className="content">
               <Route exact path="/" component={allPosts}/>
              <Route path="/new" component={newArticle}/>
              <Route path="/article/:id" component={article}/>
    /* the last route is added so that we can display indivdual article on load. We are not consuming any api over here */
              </div>
            </div>
          </HashRouter>
        );
      }
    }
     
    export default Main;

<p class="file-desc"><span>src/index.js</span></p>

We need to load the main file on every page of our application, so we add this basic code.

    import React from "react";
    import ReactDOM from "react-dom";
    import Main from "./main";
     
    ReactDOM.render(
      <Main/>, 
      document.getElementById("root")
    );
## Coding our Front-End 
**![](https://www.healthyfoodguide.com.au/sites/default/files/styles/article_main/public/The-paleo-diet-Thinkstock-491991691.jpg?itok=RviPSgK8)**


Now we come towards the final stage of our tutorial. We need create three pages that will allow us to connect with our node.js backend application. We will use axios, so that will allow us to communicate with our backend APIs. Notice how we pass variables across the render section and our function `componentDidMount()`. We are using a GET request to retrieve all the articles from our back-end. 
<p class="file-desc"><span>src/allPosts.js</span></p>

  

    import React, { Component } from "react";
    import {
      Route,
      NavLink,
      HashRouter
    } from "react-router-dom";import axios from 'axios';
    
    
    
    class allPosts extends Component {
      state = {
        articles: []
      }
    
      componentDidMount() {
        axios.get(`http://localhost:4000/articles`)
          .then(res => {
            const a = res.data;
            console.log(a);
            this.setState({ articles: a });
          })
      } 
      render() {
        return (
                  <HashRouter>
    
          <div>
               {this.state.articles.map(art => <div> <h2> <NavLink to={`article/${art._id}`}>Blog Post by {art.author}</NavLink> </h2> {art.content}</div>)}
                         <div className="content">
    
        </div>       
          </div>
              </HashRouter>
    
        );
      }
    }
     
    export default allPosts;

<p class="file-desc"><span>src/newArticle.js</span></p>

Now we need to send a post-request which will allow creating of a new article. To make it easier, we are passing the author as string instead of user input. 

    import React, { Component } from "react";
    import axios from 'axios';
    
     
    class newArticle extends Component {
      state = {
        content: '',
      }
    
      handleChange = event => {
       // console.log(event.target.value)
        this.setState({ content: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const article = {
          content: this.state.content,
          author: 'vaibhavgeek'
        };
    
        axios.post(`http://localhost:4000/article/new`,  article )
          .then(res => {
            //console.log(res);
            console.log(res.data);
            console.log(event);
            this.setState({ content: "" });
          })
      }
      render() {
        return (
          <div>
            <h2>Create New Article</h2>
            <form onSubmit={this.handleSubmit}>
                <textarea placeholder="create article" name="content" value={this.state.content} onChange={this.handleChange}>
                </textarea>
                <button type="submit">create</button>
              </form>
          </div>
        );
      }
    }
     
    export default newArticle;

<p class="file-desc"><span>src/article.js</span></p>
Now I would like the fact, that once I click on certain article, I am redirected to a page that contains only that specific article. This file allows us to do exactly that. We are making a call to our back-end API to get specific file. 

    import React, { Component } from "react";
    import {
      Route,
      NavLink,
      HashRouter
    } from "react-router-dom";
    import axios from 'axios';
    
    
    
    class article extends Component {
      state = {
        article: String,
        author: String,
        id: String
      }
    
      componentDidMount() {
        const { id } =  this.props.match.params
        axios.get(`http://localhost:4000/article/${id}`)
          .then(res => {
            const a = res.data;
            console.log(a);
            this.setState({ article: a.content , author: a.author , id: a.id });
          })
      } 
      render() {
    
        return (
          <div>
                       { this.state.article }
          </div>
        );
      }
    }
     
    export default article;


We are done with our application. You can go to terminal to power them up and check it out. It would look something like this. [COMPLETE SOURCE CODE FOR THE TUTORIAL](https://github.com/vaibhavgeek/react-node-tutorial)
**![](https://lh4.googleusercontent.com/JcHvEADRIK2Er9o13kH4_Rv641ZvbOI9sjdeNYb7DU-14Y66s4-OvOHCsGW67mFJDxsuv7uWR1y3gFGzNTJ7IELHOPSpucNH3YHh-XZRTXuRkpZA1GeKhQPCZAk3obzo31IRc97_)**
**![](https://lh6.googleusercontent.com/30rmNUxOV-b9pVX3uwib0JC47mrc5CPb5PUyjNobYrsfb2U9tk1gdv9OV6CoFrEgG3CWl-KBOCxPYgf3FUSst8CMm62AFnJIzyXdKowOqzg4jdlmGnmoeGHWJdSmdF7Z1cDP8dwd)**
