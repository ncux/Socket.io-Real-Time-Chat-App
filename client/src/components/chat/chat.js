import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import cx from 'classnames';
import styles from './chat.module.css';

const serverUrl = `http://localhost:5000`;

export const Chat = ({ location }) => {

    let socket;
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);  // location.search = query params
        console.log(name, room);
        setName(name);
        setRoom(room);

        socket = io(serverUrl);
        console.log(socket);
        socket.emit('join', { name, room });

        // component will unmount
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [serverUrl, location.search]);

    return (
        <div className="">
            <h1>Chat</h1>
        </div>
    );

};

