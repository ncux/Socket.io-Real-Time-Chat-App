import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './join.module.css';

export const Join = props => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.innerContainer }>
                <h1 className={ styles.heading }>Join</h1>
                <div>
                    <input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} className={ cx(styles.joinInput) } />
                </div>
                <div>
                    <input placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} className={ cx(styles.joinInput, styles.mt20) } />
                </div>
                <Link onClick={ event => (!name || !room) ? event.preventDefault() : null } to={ `/chat?name=${name}&room=${room}` } >
                    <button type="submit" className={ cx(styles.button, styles.mt20) }>
                        Sign in
                    </button>
                </Link>
            </div>
        </div>
    );

};

