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