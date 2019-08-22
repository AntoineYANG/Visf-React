import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './PostList';
import { Canvas } from './Visf';

ReactDOM.render(<PostList />, document.getElementById('root'));
var canvas = new Canvas(300, 150, 'canvas');
canvas.renderThis(document.getElementById('root'));
canvas.fillStyle('rgb(200,0,0)');
canvas.fillRect(10, 10, 55, 50);
canvas.fillStyle('rgba(0, 0, 200, 0.5)');
canvas.fillRect(30, 30, 55, 50);
