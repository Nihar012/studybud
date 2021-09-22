import * as actionTypes from '../actions/actions';

const initialState = {
    selectingStream: false,
    selectingSubject: false,
    selectingQpapers: false,
    selectingSyllabus: false,
    uploadingSyllabus: false,
    showModal: false,
    pattern1Show: false,
    pattern2Show: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.UI_SELECTING_ITEM:
            switch (action.itemType) {
                case 'streams':
                    return {
                        ...state,
                        selectingStream: true,
                        selectingSubject: false,
                        selectingQpapers: false,
                        selectingSyllabus: false,
                        uploadingSyllabus: false,
                        showModal: true
                    };
                case 'subjects':
                    return {
                        ...state,
                        selectingSubject: true,
                        selectingStream: false,
                        selectingQpapers: false,
                        selectingSyllabus: false,
                        uploadingSyllabus: false,
                        showModal: true
                    };
                case 'qpapers':
                    return {
                        ...state,
                        selectingQpapers: true,
                        selectingStream: false,
                        selectingSubject: false,
                        selectingSyllabus: false,
                        uploadingSyllabus: false,
                        showModal: true
                    };
                case 'syllabus':
                    return {
                        ...state,
                        selectingSyllabus: true,
                        selectingStream: false,
                        selectingSubject: false,
                        selectingQpapers: false,
                        uploadingSyllabus: false,
                        showModal: true
                    };
                case 'uploadSyllabus':
                    return {
                        ...state,
                        uploadingSyllabus: true,
                        selectingSyllabus: false,
                        selectingStream: false,
                        selectingSubject: false,
                        selectingQpapers: false,
                        showModal: true
                    };
                default:
                    throw new Error('should not reach here');
            }

        case actionTypes.UI_TOGGLE_PATTERN:
            switch (action.pattern) {
                case 'pattern 1':
                    return {
                        ...state,
                        pattern1Show: !state.pattern1Show,
                        pattern2Show: false
                    };
                case 'pattern 2':
                    return {
                        ...state,
                        pattern1Show: false,
                        pattern2Show: !state.pattern2Show
                    };
                default:
                    throw new Error('should not reach here');
            }

        case actionTypes.UI_CLOSE_SELECT_ITEMS:
            return {
                selectingStream: false,
                selectingSubject: false,
                selectingQpapers: false,
                selectingSyllabus: false,
                uploadingSyllabus: false,
                showModal: false,
                pattern1Show: false,
                pattern2Show: false
            };
        default:
            return state;
    }
};

export default reducer;