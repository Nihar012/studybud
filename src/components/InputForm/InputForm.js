import React from 'react';
import classes from './InputForm.css';
import Card from './Card/Card';
import Button from '../UI/Button/Button';

const inputForm = props => {
    return (
        <form onSubmit={props.onSubmit} className={classes.InputForm} >
            <Card
                heading="Select stream"
                cardDetail="26 available"
                selectedOption={props.selectedItems.streams ? props.selectedItems.streams.abbrevation : null}
                clicked={() => props.openSelect('streams')} />
            <Card
                heading="Select subject"
                cardDetail="26 available"
                selectedOption={props.selectedItems.subjects ? props.selectedItems.subjects.abbrevation : null}
                clicked={() => props.openSelect('subjects')} />
            <Card
                disable={props.disable}
                heading="Select question papers"
                cardDetail="26 available"
                selectedOption={props.selectedItems.qpapers.length}
                clicked={() => props.openSelect('qpapers')} />
            <Card
                disable={props.disable}
                heading="Select syllabus"
                cardDetail="26 available"
                selectedOption={props.selectedItems.syllabus ? props.selectedItems.syllabus.abbrevation : null}
                clicked={() => props.openSelect('syllabus')} />
            <Card
                disable={props.disable}
                heading="Upload syllabus"
                cardDetail="26 available"
                selectedOption=""
                clicked={() => props.openSelect('uploadSyllabus')} />

            {/* <div className={[classes.Syllabus, classes[props.divDisable]].join(' ')} >
                <h2>Search all topics</h2>
                <button
                    type="button"
                    onClick={() => props.openSelect('syllabus')} >Select syllabus
                </button>
                <p>or</p>
                <input type="file" />
            </div>

            <div className={[classes.SpecificTopic, classes[props.divDisable]].join(' ')} >
                <h2>Search a specific topic</h2>
                <input type="text" placeholder="enter keyword" />
            </div> */}

            <div>
                <Button
                    btnType="SubmitForm"
                    hidden={props.hidden}
                    type="submit" >{props.submitTitle}</Button>
            </div>
        </form>
    );
}

export default inputForm;