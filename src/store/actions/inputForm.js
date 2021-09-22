import * as actionTypes from './actions';

export const initGetItems = () => {
    return {
        type: actionTypes.INIT_GET_ITEMS
    }
}

export const getStreams = () => {
    return dispatch => {
        dispatch(setStreams([
            {
                abbrevation: 'IT',
                fullname: 'Information Technology',
                id: '1',
                isSelected: false
            },
            {
                abbrevation: 'ETC',
                fullname: 'Electronics & Telecommunication',
                id: '2',
                isSelected: false
            },
            {
                abbrevation: 'COMP',
                fullname: 'Computer Science',
                id: '3',
                isSelected: false
            },
            {
                abbrevation: 'ME',
                fullname: 'Mechanical Engineering',
                id: '4',
                isSelected: false
            },
            {
                abbrevation: 'CIVIL',
                fullname: 'Cival Engineering',
                id: '5',
                isSelected: false
            }
        ]));
    }
}

export const getSubjects = (stream) => {
    return dispatch => {
        dispatch(setSujects([
            {
                abbrevation: 'ADSA',
                fullname: 'Advanced data structures & algorithms',
                id: '1',
                isSelected: false
            },
            {
                abbrevation: 'IDC',
                fullname: 'Information & data communication',
                id: '2',
                isSelected: false
            },
            {
                abbrevation: 'OOPS',
                fullname: 'Object oriented programming and structures',
                id: '3',
                isSelected: false
            },
            {
                abbrevation: 'ECOM',
                fullname: 'E-commerce',
                id: '4',
                isSelected: false
            }
        ]));
    }
}

export const getQpapers = (subject) => {
    return dispatch => {
        dispatch(setQpapers([
            {
                abbrevation: 'MAY/JUNE 2017',
                questions: 21,
                id: '1',
                isSelected: false,
                patternType: 'pattern 1'
            },
            {
                abbrevation: 'NOV/DEC 2017',
                questions: 22,
                id: '2',
                isSelected: false
            },
            {
                abbrevation: 'MAY/JUNE 2018',
                questions: 23,
                id: '3',
                isSelected: false
            },
            {
                abbrevation: 'NOV/DEC 2018',
                questions: 20,
                id: '4',
                isSelected: false
            },
            {
                abbrevation: 'MAY/JUNE 2019',
                questions: 25,
                id: '5',
                isSelected: false
            }
        ]));
    }
}

export const getSyllabus = (subject) => {
    return dispatch => {
        dispatch(setSyllabus([
            {
                abbrevation: 'MAY/JUNE 2017',
                topics: 21,
                id: '1',
                isSelected: false
            },
            {
                abbrevation: 'NOV/DEC 2017',
                topics: 22,
                id: '2',
                isSelected: false
            },
            {
                abbrevation: 'MAY/JUNE 2018',
                topics: 23,
                id: '3',
                isSelected: false
            },
            {
                abbrevation: 'NOV/DEC 2018',
                topics: 20,
                id: '4',
                isSelected: false
            },
            {
                abbrevation: 'MAY/JUNE 2019',
                topics: 25,
                id: '5',
                isSelected: false
            }
        ]));
    }
}

export const getItems = (itemType) => {
    return dispatch => {
        dispatch(initGetItems());
        if(itemType === 'initial')
            dispatch(getStreams());
        else if (itemType === 'streams')
            dispatch(getSubjects());
        else if (itemType === 'subjects'){
            dispatch(getQpapers());
            dispatch(getSyllabus());
        }            
    }
}


export const setStreams = (streams) => {
    return {
        type: actionTypes.SET_STREAMS,
        streams: streams
    }
}

export const setSujects = (subjects) => {
    return {
        type: actionTypes.SET_SUBJECTS,
        subjects: subjects
    }
}

export const setQpapers = (qpapers) => {
    return {
        type: actionTypes.SET_QPAPERS,
        qpapers: qpapers
    }
}

export const setSyllabus = (syllabus) => {
    return {
        type: actionTypes.SET_SYLLABUS,
        syllabus: syllabus
    }
}


export const selectItem = (itemType, itemId) => {
    return {
        type: actionTypes.SELECT_ITEM,
        itemType: itemType,
        itemId: itemId
    }
}

export const setSelectedItem = () => {
    return {
        type: actionTypes.SET_SELECTED_ITEM
    }
}

export const onSelect = (itemType, itemId) => {
    return dispatch => {
        dispatch(selectItem(itemType, itemId));
        dispatch(setSelectedItem());
    }
}

