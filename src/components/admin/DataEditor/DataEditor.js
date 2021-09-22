import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './DataEditor.css';

const dataEditor = (props) => {
    return (
        <div className={classes.DataEditor} >
            <div className={classes.Toolbar} >
                <div className={classes.Heading} >Data Editor</div>
                <div className={classes.CloseButton} onClick={props.closed} >ole</div>
            </div>
            <textarea value={props.value} onChange={(event) => props.changed(event)} />
            <div className={classes.Buttons} >
                <Button btnType="Danger" clicked={props.cancel} >CANCEL</Button>
                <Button btnType="Success" clicked={props.submit} >DONE</Button>
            </div>
        </div>
    );
}

export default dataEditor;