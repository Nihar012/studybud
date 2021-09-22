import React from 'react';
import classes from './Input.css';
import CreateData from '../../../../assets/icons/CreateData/CreateData';
import Close from '../../../../assets/icons/Close/Close';
import { connect } from 'react-redux';
import Spinner from '../../../UI/Spinner/Spinner';
import CustomSelect from '../../../UI/CustomSelect/CustomSelect';
import Success from '../../../../assets/icons/Success/Success';
import Danger from '../../../../assets/icons/Danger/Danger';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (!props.isValid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    if (props.isValid) {
        inputClasses.push(classes.Valid);
    }

    let statusMessageSignal = null;
    if (props.dataCreatorStatus.status === 'running') {
        statusMessageSignal = <div className={classes.Spinner} ><Spinner /></div>;
    }
    if (props.dataCreatorStatus.status === 'success') {
        statusMessageSignal = <div className={classes.Success} ><Success /></div>;
    }
    if (props.dataCreatorStatus.status === 'danger') {
        statusMessageSignal = <div className={classes.Danger} ><Danger /></div>;
    }

    let fileElement = <React.Fragment>
        <label htmlFor="uploadFile" >Upload File</label>
        <input type="file" id="uploadFile" onChange={props.changed} style={{ display: "none" }} accept=".jpg, .jpeg, .png, .pdf" />
    </React.Fragment>;
    if (props.uploadedFile) {
        fileElement = <React.Fragment>
            <img src={URL.createObjectURL(props.uploadedFile)} alt="uploaded file" />
            <div className={classes.CloseButton} onClick={props.clearUploadedFile} ><Close /></div>
        </React.Fragment>
    }

    switch (props.inputtype) {
        case 'input':
            inputElement = <React.Fragment>
                <label htmlFor="input" >{props.label}</label>
                <input
                    id="input"
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            </React.Fragment>
            break;
        case 'select':
            inputElement = <React.Fragment>
                <label htmlFor="selectPattern" >{props.label}</label>
                <div id="selectPattern" className={classes.SelectPattern} >
                    <CustomSelect
                        clicked={props.changed}
                        selectDisplayValue={props.value}
                        options={props.elementConfig.options} />
                </div>
            </React.Fragment>
            break;
        case 'dataCreator':
            inputElement = <React.Fragment>
                <label htmlFor="dataCreator" >{props.label}</label>
                <div id="dataCreator" className={classes.DataCreator}>
                    <div className={classes.Buttons} >
                        <label htmlFor="dataInp" ><p>Scan Data</p><CreateData /></label>
                        <input type="file" id="dataInp" onChange={props.changed} style={{ display: "none" }} accept=".png, .jpg, .jpeg" />
                        <button onClick={props.clicked} >Open Editor</button>
                    </div>
                    <div className={classes.Status} >
                        {statusMessageSignal}
                        <p className={classes.Message} >
                            {props.dataCreatorStatus.statusMessage}
                        </p>
                    </div>
                </div>
            </React.Fragment>
            break;
        case 'file':
            inputElement = <React.Fragment>
                <label htmlFor="file" >{props.label}</label>
                <div id="file" className={classes.UploadArea} >
                    {fileElement}
                </div>
            </React.Fragment>
            break;
        default:
            return inputElement;
    }

    return (
        <div className={classes.Input} >
            {inputElement}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        dataCreatorStatus: {
            status: state.admin.dataCreatorStatus.status,
            statusMessage: state.admin.dataCreatorStatus.statusMessage
        }
    }
}

export default connect(mapStateToProps)(input);