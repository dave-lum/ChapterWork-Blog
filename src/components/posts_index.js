import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchPosts, fetchPost} from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>All Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }
}

// Docs say this is required to be a function, not an object (unlike mapDispatchToProps)
function mapStateToProps(state) {
  return {posts: state.posts};
}

// Using the brief object '{fetchPosts}' below is allowed instead of a full-blown
// `mapDispatchToProps` function. Here's an explanation:
// https://medium.com/mofed/reduxs-mysterious-connect-function-526efe1122e4
//
// Also from https://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/:
//
// Now that we have “provided” the redux store to our application, we can now connect our components
// to it. We established previously that there is no way to directly interact with the store. We can
// either retrieve data by obtaining its current state, or change its state by dispatching an action
// (we only have access to the top and bottom component of the redux flow diagram shown previously).
//
// This is precisely what connect does.
  
export default connect(mapStateToProps, {fetchPosts, fetchPost})(PostsIndex);
