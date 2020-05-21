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