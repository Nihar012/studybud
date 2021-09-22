import * as actionTypes from '../actions/actions';

const initialState = {
    idToken: null,
    userId: null,
    isAdmin: false,
    error: null,
    loading: false,
    showModal: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                showModal: true
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                isAdmin: action.email ? true : false,
                loading: false,
                error: null,
                showModal: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.AUTH_CLOSE:
            return {
                ...state,
                showModal: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null,
                isAdmin: false
            }
        default:
            return state;
    }
}

export default reducer;