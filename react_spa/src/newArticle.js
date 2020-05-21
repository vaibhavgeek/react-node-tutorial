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