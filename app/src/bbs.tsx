import React, { Component, ChangeEvent } from 'react';
import './bbs.css';
import like from './images/like-default.png';

export interface PItem {
  id: number;
  title: string;
  author: string;
  date: string;
  like: number;
}

export interface PItemProps {
  post: PItem;
  onLike: (id: number) => void;
  onSave: (post: PItem) => void;
}

export interface PItemState {
  post: PItem;
  editing: boolean;
}

class PostItem extends Component<Readonly<PItemProps>, PItemState, any> {
  public readonly state: PItemState = {
    post: {
      id: NaN,
      title: '-',
      author: '-',
      date: '-',
      like: -1
    },
    editing: false
  };

  // Inner logic
  private handleLike(): void {
    this.props.onLike(this.props.post.id);
  }

  private handleEditPost(): void {
    const editing: boolean = this.state.editing;
    if (editing) {
      this.props.onSave({
        ...this.state.post,
        date: this.getFormatDate()
      });
    }
    this.setState({
      editing: !editing
    });
  }

  private handleTitleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const newPost: PItem = { ...this.state.post, title: event.target.value };
    this.setState({
      post: newPost
    });
  }

  private getFormatDate(): string {
    return (new Date()).toLocaleDateString();
  }

  // To mount
  public constructor(props: Readonly<PItemProps>) {
    super(props);
    this.state = {
      editing: false,
      post: props.post
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  public render(): JSX.Element {
    const title: string = this.state.post.title;
    const post: PItem  = this.props.post;
    return (
      <li className='item'>
        <div className='title'>
          { this.state.editing
              ? <form>
                  <textarea
                    value={ title }
                    onChange={ this.handleTitleChange }
                  />
                </form>
              : post.title }
        </div>
        <div>
          Author: <span>{ post.author }</span>
        </div>
        <div>
          Create time: <span>{ post.date }</span>
        </div>
        <div className='like'>
          <span>
            <img src={like} onClick={this.handleLike} alt='like' />
          </span>
          <span>
            { post.like }
          </span>
        </div>
        <div>
          <button onClick={this.handleEditPost}>
            { this.state.editing
                ? 'Save'
                : 'Edit' }
          </button>
        </div>
      </li>
    );
  }

  // To update
  public static getDerivedStateFromProps(nextProps: PItemProps, prevState: PItemProps): PItem | null {
    const { post } = nextProps;
    console.log(post !== prevState.post ? post : null);
    return post !== prevState.post ? post : null;
  }
}

export default PostItem;
