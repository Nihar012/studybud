import React from 'react';
import classes from './Button.css';

const button = props => {
    return (
        <button 
            hidden={props.hidden}
            disabled={props.disabled}
            onClick={props.clicked}
            className={[classes.Button, classes[props.btnType], props.active ? classes.active : ''].join(' ')} >
            {props.children}
        </button>
    )
}

export default button;