import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/admin/Forms/Input/Input';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                inputtype: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address  eg.(user@mail.com)'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                inputtype: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        isLogIn: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isLogIn);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isLogIn: !prevState.isLogIn
            }
        });
    }

    render() {

        let classNames = [classes.Auth];
        if (!this.state.isLogIn) {
            classNames.push(classes.SignUp);
        }

        let heading = 'LOG IN';
        if (!this.state.isLogIn) {
            heading = 'SIGN UP';
        }

        let switchMessage = "Don't have an account?";
        if (!this.state.isLogIn) {
            switchMessage = 'Already have an account?';
        }

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                inputtype={formElement.config.inputtype}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                isValid={formElement.config.valid}                
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        return (
            <div className={classNames.join(' ')}>
                <form onSubmit={this.submitHandler}>
                    <p className={classes.Heading}>
                        {heading}
                    </p>
                    {form}
                    <div className={classes.SubmitButton}>
                        <Button btnType="Success">SUBMIT</Button>
                    </div>
                </form>
                <hr />
                <p className={classes.SwitchMessage}>{switchMessage}</p>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger" >Switch to {this.state.isLogIn ? 'SIGN UP' : 'LOG IN'}</Button>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isLogIn) => dispatch(actions.onAuth(email, password, isLogIn))
    }
}

export default connect(null, mapDispatchToProps)(Auth);