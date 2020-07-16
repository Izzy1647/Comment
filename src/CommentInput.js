import React, { Component } from 'react'

class CommentInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      content: "",
    }
    this.textareaNode = undefined
  }

  // 自动聚焦到评论输入框
  componentDidMount(){
    if(this.textareaNode){
      this.textareaNode.focus()
    }
  }

  // 自动加载当前浏览器用户的用户名
  componentWillMount(){
    this._loadUserName()
  }

  // 监听输入username onchange调用 改变state中的状态 再更新到输入框的value中
  handleUserNameChange(e){  
    this.setState({
      username: e.target.value
    })
  }

  handleUserContentChange(e){
    this.setState({
      content: e.target.value
    })
  }

  // 向上 把{username,content}传给CommentApp 然后ComentApp再下发给CommentList
  handleSubmit(e){   
    if(this.props.onSubmit){
      const {username, content} = this.state
      this.props.onSubmit({username,content})
    }
    this.setState({
      content: ""
    })
  }

  _saveUserName(username){
    localStorage.setItem('username',username)
  }

  _loadUserName(){
    let username = localStorage.getItem("username")
    if(username){
      this.setState({
        username
      })
    }
  }

  handleUserNameBlur(e){
    this._saveUserName(e.target.value)
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">
            Username:
          </span>
          <div className="comment-field-input">

            {/* 用户姓名输入框 */}
            <input 
              value={this.state.username} 
              onChange={this.handleUserNameChange.bind(this)}
              onBlur={this.handleUserNameBlur.bind(this)}
            />

          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">
            Content:
          </span>
          <div className="comment-field-input">

            {/* 评论内容输入框 */}
            <textarea 
              ref={(thisNode) => this.textareaNode = thisNode }
              value={this.state.content} 
              onChange={this.handleUserContentChange.bind(this)}
            />

          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>
            Publish
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput