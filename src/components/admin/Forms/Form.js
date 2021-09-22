import React, { Component } from 'react';
import classes from './Form.css';
import Input from './Input/Input';
import Button from '../../UI/Button/Button';

class Form extends Component {

    render() {

        let formItems = null;
        switch (this.props.itemType) {
            case 'streams':
                formItems = (
                    <React.Fragment>
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Abbrevation  eg.(IT)"
                            }}
                            value={this.props.abbrevation}
                            isValid={this.props.abbrevation.length > 0}
                            changed={(event) => this.props.changed(event, 'abbrevation')} />
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Fullname  eg.(Information Technology)"
                            }}
                            value={this.props.fullname}
                            isValid={this.props.fullname.length > 0}
                            changed={(event) => this.props.changed(event, 'fullname')} />
                    </React.Fragment>
                );
                break;
            case 'subjects':
                formItems = (
                    <React.Fragment>
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Abbrevation  eg.(DS)"
                            }}
                            value={this.props.abbrevation}
                            isValid={this.props.abbrevation.length > 0}
                            changed={(event) => this.props.changed(event, 'abbrevation')} />
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Fullname  eg.(Distributed Systems)"
                            }}
                            value={this.props.fullname}
                            isValid={this.props.fullname.length > 0}
                            changed={(event) => this.props.changed(event, 'fullname')} />
                    </React.Fragment>
                );
                break;
            case 'qpapers':
                formItems = (
                    <React.Fragment>
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Abbrevation  eg.(MAY/JUNE)"
                            }}
                            value={this.props.abbrevation}
                            isValid={this.props.abbrevation.length > 0}
                            changed={(event) => this.props.changed(event, 'abbrevation')} />
                        <Input
                            inputtype="input"
                            elementConfig={{
                                type: "number",
                                placeholder: "Year  eg.(2020)"
                            }}
                            value={this.props.year}
                            isValid={this.props.year.length > 0}
                            changed={(event) => this.props.changed(event, 'year')} />
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Extra detail  eg.(RC 2016-17)"
                            }}
                            value={this.props.extraDetail}
                            isValid={this.props.extraDetail.length > 0}
                            changed={(event) => this.props.changed(event, 'extraDetail')} />
                        <Input
                            inputtype="select"
                            elementConfig={{
                                options: [
                                    { value: 'pattern1', displayValue: 'Pattern 1' },
                                    { value: 'pattern2', displayValue: 'Pattern 2' }
                                ]
                            }}
                            value={this.props.patternType === 'pattern1' ? 'Pattern 1' : 'Pattern 2'}
                            isValid={this.props.patternType.length > 0}
                            changed={this.props.changed} />
                        <Input
                            inputtype="dataCreator"
                            changed={(event) => this.props.changed(event, 'dataCreator')}
                            clicked={this.props.showDataEditor} />
                        <Input
                            inputtype="file"
                            uploadedFile={this.props.uploadedFile}
                            clearUploadedFile={(event) => this.props.changed(event, 'clearUploadedFile')}
                            changed={(event) => this.props.changed(event, 'uploadedFile')} />
                    </React.Fragment>
                );
                break;
            case 'syllabus':
                formItems = (
                    <React.Fragment>
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Abbrevation  eg.(MAY/JUNE)"
                            }}
                            value={this.props.abbrevation}
                            isValid={this.props.abbrevation.length > 0}
                            changed={(event) => this.props.changed(event, 'abbrevation')} />
                        <Input
                            inputtype="input"
                            elementConfig={{
                                type: "number",
                                placeholder: "Year  eg.(2020)"
                            }}
                            value={this.props.year}
                            isValid={this.props.year.length > 0}
                            changed={(event) => this.props.changed(event, 'year')} />
                        <Input
                            inputtype="input"
                            elementConfig={{
                                placeholder: "Extra detail  eg.(RC 2016-17)"
                            }}
                            value={this.props.extraDetail}
                            isValid={this.props.extraDetail.length > 0}
                            changed={(event) => this.props.changed(event, 'extraDetail')} />
                    </React.Fragment>
                );
                break;
            default:
                return formItems;
        }

        return (
            <form className={classes.Form} onSubmit={this.props.submitted} >
                <div className={classes.FormItems} >
                    {formItems}
                </div>
                <div className={classes.Buttons} >
                    <Button btnType="Danger" >CANCEL</Button>
                    <Button btnType="Success" >SUBMIT</Button>
                </div>
            </form>
        )
    }
}

export default Form;