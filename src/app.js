import React, {Component} from 'react';
import io from 'socket.io-client';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <p>Hello world</p>;
    }
}