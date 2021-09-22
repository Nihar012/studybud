import React from 'react';
import { connect } from 'react-redux';
import classes from './Toolbar.css';
import * as actions from '../../../store/actions/index';
import Login from '../../../assets/icons/Login/Login';
import User from '../../../assets/icons/User/User';

const toolbar = props => {

    const authHandler = () => {
        if (!props.isAuth)
            props.onAuthInit();
        else
            props.onAuthLogout();
    }

    let authOption = <Login />;
    if (props.isAuth) {
        authOption = <User />;
    }

    return (
        <header className={classes.Toolbar}>
            <div>
                <p>studyBud</p>
            </div>
            <div onClick={authHandler} className={classes.AuthOption}>
                <div>{authOption}</div>
            </div>
        </header>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        onAuthInit: () => dispatch(actions.authInit()),
        onAuthLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(toolbar);