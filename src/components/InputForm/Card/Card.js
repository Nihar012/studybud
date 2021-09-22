import React from 'react';
import classes from './Card.css';

const card = props => {

    const classNames = [classes.Card, classes.ripple];
    if (props.disable) {
        classNames.push(classes.disable);
    }

    let selectedMessage = <h5>none selected</h5>;
    if (props.selectedOption) {
        selectedMessage = <h5>{props.selectedOption}</h5>;
        classNames.push(classes.Selected);
    }
    if (props.selectedOption && +props.selectedOption >= 0) {
        selectedMessage = <div><h2>{props.selectedOption}</h2><p>SELECTED</p></div>;
        classNames.push(classes.Selected);
    }

    const clickHandler = () => {
        setTimeout(() => {
            props.clicked();
        }, 350)
    }

    return (
        <button className={classNames.join(' ')} onClick={clickHandler} >
            <div className={classes.Details} >
                <h3>{props.heading}</h3>
                <p>{props.cardDetail}</p>
            </div>
            <div className={classes.SelectedOption} >
                {selectedMessage}
            </div>
        </button>
    )
}

export default card;