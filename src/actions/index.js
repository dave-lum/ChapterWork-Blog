import axios from 'axios';

export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=66000';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  
  return {
    type: FETCH_POSTS,
    payload: request
  };
};

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  
  return {
    type: FETCH_POST,
    payload: request
  };
};

export function deletePost(id, onRequestComplete) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(onRequestComplete);
  
  return {
    type: DELETE_POST,
    payload: id
  };
};

export function createPost(values, onRequestComplete) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(onRequestComplete);
  
  return {
    type: CREATE_POST,
    payload: request
  };
};

