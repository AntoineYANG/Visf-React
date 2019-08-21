import React, {  } from 'react';
import './bbs.css';
import like from './images/like-default.png';

export interface PItem {
  id: number;
  title: string;
  author: string;
  date: string;
  like: number;
}

export interface Post {
  post: PItem;
  onLike: (id: number) => boolean;
}

function PostItem(props: Post): JSX.Element {
  const handleClick: () => void = () => {
    props.onLike(props.post.id);
  };
  const { post }: Post = props;
  return (
    <li className = 'item'>
      <div>
        { post.title }
      </div>
      <div>
        Author: <span>{ post.author }</span>
      </div>
      <div>
        Create time: <span>{ post.date }</span>
      </div>
      <div className = 'like'>
        <span><img src={like} onClick={handleClick} alt='like' /></span>
        <span>{ post.like }</span>
      </div>
    </li>
  );
}

export default PostItem;
