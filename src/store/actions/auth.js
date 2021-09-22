import * as actionTypes from './actions';
import axios from 'axios';

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
        email: email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    }
}

export const onAuth = (email, password, isLogIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNU2abAU5D7TFblntN0RDNjJBU-PxKAgU';
        if(isLogIn){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNU2abAU5D7TFblntN0RDNjJBU-PxKAgU'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                let email = false;
                if(response.data.email === 'admin@admin.com'){
                    email = true;
                }
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                if(response.data.email === 'admin@admin.com'){
                    localStorage.setItem('email', response.data.email);
                }
                dispatch(authSuccess(response.data.idToken, response.data.localId, email));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const authClose = () => {
    return {
        type: actionTypes.AUTH_CLOSE
    }
}

export const autoLogIn = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if(!idToken){
            dispatch(authLogout());
        }else {
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                dispatch(authSuccess(idToken, userId, email));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }else {
                dispatch(authLogout());
            }
        }
    }
}