import React, { Component } from 'react';
import PostItem, { PItem } from './bbs';
import logo from './logo.svg';
import './App.css'
import './bbs.css'

export interface PList {
    posts: Array<PItem>;
}

class PostLine extends Component<{}, PList, any> {
    public readonly state: PList = {
        posts: []
    };
    private timer: NodeJS.Timeout | null = null;

    // Inner logic
    private handleLike(id: number): void {
        const posts: Array<PItem> = this.state.posts.map(item => {
            return item.id === id ? {...item, like: ++item.like} : item;
        });
        this.setState({
            posts
        });
    }

    private handleSave(post: PItem): void {
        const posts: Array<PItem> = this.state.posts.map(item => {
            return item.id === post.id ? post : item;
        });
        this.setState({
            posts
        });
    }

    // To mount
    public constructor(props: {}) {
        super(props);
        this.timer = null;
        this.handleLike = this.handleLike.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    render(): JSX.Element {
        return (
            <div className="App">
                <div className="App-header" style={{flexDirection: 'row', minHeight: '0px'}}>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h2>Welcome to React</h2>
                </div>
                <div className='container'>
                    <h2>Post</h2>
                    <ul>
                        {this.state.posts.map(item =>
                            <PostItem
                                key = { item.id }
                                post = { item }
                                onLike = { this.handleLike }
                                onSave = { this.handleSave }
                            />
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    public componentDidMount(): boolean {
        this.timer = setTimeout(() => {
            this.setState({
                posts: [
                    { id: 1, title: 'Let\'s talk about React', author: 'A103', date: '2017/09/01 10:00', like: 0 },
                    { id: 2, title: 'Which front-end framework do you enjoy the most?', author: 'A104', date: '2017/09/01 12:00', like: 0 },
                    { id: 3, title: 'Age of Web App has befallen', author: 'A105', date: '2017/09/01 14:00', like: 0 }
                ]
            });
        }, 1000);
        return true;
    }

    // To unmount
    public componentWillUnmount(): boolean {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        return true;
    }
}

export default PostLine;
