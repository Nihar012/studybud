import React from 'react';
import classes from './SelectItem.css';
import Button from '../../Button/Button';
import Edit from '../../../../assets/icons/Edit/Edit';
import Dustbin from '../../../../assets/icons/Dustbin/Dustbin';

const selectItem = props => {

    let classNames = [classes.SelectItem];
    let thumbnailClassNames = [classes.thumbnail];
    let buttons = null;
    let editButtons = null;

    if (props.selected) {
        classNames.push(classes.Selected);
        thumbnailClassNames.push(classes.Selected);
    };
    if (props.downloads) {
        classNames.push(classes.Downloads);
        buttons = (
            <div className={classes.Buttons} >
                <Button btnType="View" clicked={() => { console.log('ole') }} >View</Button>
                <Button btnType="Download" clicked={() => { }} >Download</Button>
            </div>
        );
    };
    if (props.itemType === 'qpapers' || props.itemType === 'syllabus') {
        classNames.push(classes.Qpapers);
    }
    if (props.itemType === 'streams' || props.itemType === 'subjects') {
        classNames.push(classes.TwoInARow);
    }

    if (props.admin) {
        classNames.push(classes.Admin, classes.TwoInARow);
        editButtons = <div className={classes.EditButtons} >
            <p onClick={props.edit} ><Edit /></p>
            <p onClick={props.delete} ><Dustbin /></p>
        </div>;
    }


    return (
        <div className={classNames.join(' ')} >
            <div className={thumbnailClassNames.join(' ')} >
                <div className={classes.ForClick} onClick={props.clicked} ></div>
                <p className={classes.Abbrevation} >{props.details.abbrevation}</p>
                <div className={classes.AllDetails}>
                    <p className={classes.Fullform} >{props.details.fullname ? props.details.fullname : props.details.year}</p>
                    <p className={classes.ExtraDetail} >{props.details.extraDetail}</p>
                </div>
                {buttons}
                {editButtons}
            </div>

        </div>
    )
}

export default selectItem;