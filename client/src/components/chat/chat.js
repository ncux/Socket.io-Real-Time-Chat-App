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
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // joining the room
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

    // handling new (received) messages
    useEffect(() => {
        socket.on('message', message => setMessages([message, ...messages]));
    }, [messages]);

    const sendMessage = event => {
        event.preventDefault();
        if(message) {
            socket.emit('user_message', message, () => setMessage(''));
        }
    };

    console.log(message, messages);

    return (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                <input type="text" value={message}
                       onChange={(event) => setMessage(event.target.value)}
                       onKeyPress={(event) => event.key == 'Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    );

};

