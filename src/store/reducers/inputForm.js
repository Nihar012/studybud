import * as actionTypes from '../actions/actions';

const initialState = {
    streams: [],
    subjects: [],
    qpapers: [],
    syllabus: [],
    selectedItems: {
        streams: null,
        subjects: null,
        qpapers: [],
        syllabus: null
    },
    itemsLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.INIT_GET_ITEMS:
            return {
                ...state,
                itemsLoading: true
            };

        case actionTypes.SET_STREAMS:
            return {
                ...state,
                streams: state.selectedItems.streams ? state.streams : action.streams,
                subjects: state.subjects.length > 0 ? state.subjects : [],
                qpapers: state.qpapers.length > 0 ? state.qpapers : [],
                syllabus: state.syllabus.length > 0 ? state.syllabus : [],
                itemsLoading: false
            };

        case actionTypes.SET_SUBJECTS:
            return {
                ...state,
                subjects: state.selectedItems.streams ? action.subjects : [],
                qpapers: [],
                syllabus: [],
                selectedItems: {
                    ...state.selectedItems,
                    subjects: null,
                    qpapers: [],
                    syllabus: null
                },
                itemsLoading: false
            };

        case actionTypes.SET_QPAPERS:
            return {
                ...state,
                qpapers: state.selectedItems.subjects ? action.qpapers : [],
                selectedItems: {
                    ...state.selectedItems,
                    qpapers: []
                },
                itemsLoading: false
            };

        case actionTypes.SET_SYLLABUS:
            return {
                ...state,
                syllabus: state.selectedItems.subjects ? action.syllabus : [],
                selectedItems: {
                    ...state.selectedItems,
                    syllabus: null
                }
            }

        case actionTypes.SELECT_ITEM:
            const prevIndex = state[action.itemType].findIndex(item => item.isSelected === true);
            const index = state[action.itemType].findIndex(item => item.id === action.itemId);
            const newSelectedStatus = !state[action.itemType][index].isSelected;
            const updatedItems = [...state[action.itemType]];
            updatedItems[index] = {
                ...updatedItems[index],
                isSelected: newSelectedStatus
            };
            if (action.itemType !== 'qpapers') {
                updatedItems[prevIndex] = {
                    ...updatedItems[prevIndex],
                    isSelected: false
                };
            }

            return {
                ...state,
                [action.itemType]: updatedItems
            };

        case actionTypes.SET_SELECTED_ITEM:
            const selectedStream = state.streams.filter(stream => stream.isSelected === true);
            const selectedSubject = state.subjects.filter(subject => subject.isSelected === true);
            const selectedSyllabus = state.syllabus.filter(syl => syl.isSelected === true);
            return {
                ...state,
                selectedItems: {
                    ...state.selectedItems,
                    streams: selectedStream.length > 0 ? selectedStream[0] : null,
                    subjects: selectedSubject.length > 0 ? selectedSubject[0] : null,
                    qpapers: state.qpapers.filter(qpaper => qpaper.isSelected === true),
                    syllabus: selectedSyllabus.length > 0 ? selectedSyllabus[0] : null
                }
            };

        default:
            return state;
    }
}

export default reducer;