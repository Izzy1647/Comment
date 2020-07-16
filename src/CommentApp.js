import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {

  constructor(props){
    super(props)
    this.state = {
      comments: []
    }

  }

  componentWillMount(){
    this._loadComments()
  }

  // 把这个函数下发给CommentInput  让CommentInput调用这个函数 把数据传上来
  handleSubmitComment(comment){
    console.log("this comment:",comment)

    if(!comment) return 
    if(!comment.username) return alert("Input your username!")
    if(!comment.content) return alert("Input your content!")

    // 接收到comment对象 push进comments
    this.state.comments.push(comment)
    this.setState({
      comments: this.state.comments
    })

    this._saveComments(this.state.comments)
  }

  _saveComments(comments){
    localStorage.setItem("comments",JSON.stringify(comments))
  }

  _loadComments(){
    let comments = localStorage.getItem("comments")
    if(comments){
      comments = JSON.parse(comments)
      console.log("comments:",comments)
      this.setState({
        comments
      })
    }
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput 
          onSubmit={this.handleSubmitComment.bind(this)} 
        />

        <CommentList comments={this.state.comments} />
      </div>
    )
  }
}

export default CommentApp