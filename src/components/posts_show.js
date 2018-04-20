import React, {Component} from 'React';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchPost} from '../actions';
import {deletePost} from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
  }

  onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }
  
  render() {
    const {post} = this.props;

    if (!post) {
      return <div>Waiting...</div>;
    }
    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// Shitty old ES5 barbarism:
// function mapStateToProps(state) {
//   return {posts: state.posts};
// }

function mapStateToProps({posts}, ownProps /*optional, props from the component*/) {
  const postId = ownProps.match.params.id;  // Or const {id} = this.props.match.params;
  return {post: posts[postId]};
}

export default connect(mapStateToProps, {fetchPost,deletePost})(PostsShow);

