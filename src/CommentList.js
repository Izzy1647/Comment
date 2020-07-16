import React, { Component } from 'react'
import Comment from './Comment'

// <CommentList comments=[] />

// 把comment对象{} 传给下层Comment组件去渲染

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment,i) => {
          return <Comment comment={comment} key={i} />
        })}
      </div>
    )
  }
}

export default CommentList