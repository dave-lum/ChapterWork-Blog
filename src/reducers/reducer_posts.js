import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';

export default function(state = {}, action) {
  switch (action.type) { 
  case FETCH_POST: {
    const post = action.payload.data;
    // Junky old ES5 barbarism below!
    //
    // const newState = {...state };
    // newState[post.id] = post;
    // return newState;
    return {...state, [post.id]: post};
  }
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, "id");
  case DELETE_POST: {
    const postId = action.payload;
    return _.omit(state, postId);
  }
  default:
    return state;
  }
}
