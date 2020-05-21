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

          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;