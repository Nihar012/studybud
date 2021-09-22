import React from 'react';
import classes from './AddCard.css';

const addCard = props => {

    return (
        <div className={classes.AddCard} onClick={props.clicked} >
            +
        </div>
    )
}

export default addCard;