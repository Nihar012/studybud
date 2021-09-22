import * as actionTypes from '../actions/actions';

const initialState = {
    streams: [],
    subjects: [],
    qpapers: [],
    syllabus: [],
    selectedItems: {
        streams: null,
        subjects: null,
        qpapers: null,
        syllabus: null
    },
    showModal: false,
    inputFields: {
        abbrevation: '',
        fullname: '',
        year: '',
        extraDetail: '',
        id: '',
        patternType: 'pattern1',
        qpaperData: null,
        syllabusData: null,
        streamKey: '',
        subjectKey: '',
        qpaperKey: '',
        syllabusKey: '',
        uploadedFile: null,
        editing: false
    },
    dataCreatorStatus: {
        status: 'idle',
        statusMessage: 'No Data'
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADMIN_SET_STREAMS:
            return {
                ...state,
                streams: action.streams,
                subjects: [],
                qpapers: [],
                syllabus: [],
                selectedItems: {
                    streams: null,
                    subjects: null,
                    qpapers: null,
                    syllabus: null
                },
                showModal: false
            };
        case actionTypes.ADMIN_SET_SUBJECTS:
            return {
                ...state,
                subjects: action.subjects,
                qpapers: [],
                syllabus: [],
                selectedItems: {
                    ...state.selectedItems,
                    subjects: null,
                    qpapers: null,
                    syllabus: null
                },
                showModal: false
            };
        case actionTypes.ADMIN_SET_QPAPERS:
            return {
                ...state,
                qpapers: action.qpapers,
                selectedItems: {
                    ...state.selectedItems,
                    qpapers: null
                },
                showModal: false
            }
        case actionTypes.ADMIN_SET_SYLLABUS:
            return {
                ...state,
                syllabus: action.syllabus,
                selectedItems: {
                    ...state.selectedItems,
                    syllabus: null,
                },
                showModal: false
            }
        case actionTypes.ADMIN_OPEN_MODAL:
            return {
                ...state,
                showModal: true
            };
        case actionTypes.ADMIN_CLOSE_MODAL:
            return {
                ...state,
                showModal: false,
                inputFields: {
                    abbrevation: '',
                    fullname: '',
                    year: '',
                    extraDetail: '',
                    id: '',
                    patternType: 'pattern1',
                    qpaperData: null,
                    syllabusData: null,
                    streamKey: '',
                    subjectKey: '',
                    qpaperKey: '',
                    syllabusKey: '',
                    uploadedFile: null,
                    editing: false
                }
            }
        case actionTypes.ADMIN_SELECT_STREAM:
            return {
                ...state,
                selectedItems: {
                    ...state.selectedItems,
                    streams: action.stream
                }
            };
        case actionTypes.ADMIN_SELECT_SUBJECT:
            return {
                ...state,
                selectedItems: {
                    ...state.selectedItems,
                    subjects: action.subject
                }
            };
        case actionTypes.ADMIN_SELECT_QPAPER:
            return {
                ...state,
                selectedItems: {
                    ...state.selectedItems,
                    qpapers: action.qpaper
                }
            };
        case actionTypes.ADMIN_SELECT_SYLLABUS:
            return {
                ...state,
                selectedItems: {
                    ...state.selectedItems,
                    syllabus: action.syllabus
                }
            };
        case actionTypes.ADMIN_CHANGE_INPUTFIELD:
            return {
                ...state,
                inputFields: {
                    ...state.inputFields,
                    [action.fieldname]: action.value
                }
            };
        case actionTypes.ADMIN_EDIT_INIT:
            return {
                ...state,
                inputFields: action.inputFields
            }
        case actionTypes.ADMIN_CHANGE_DATA_CREATOR_STATUS:
            return {
                ...state,
                dataCreatorStatus: {
                    status: action.status,
                    statusMessage: action.statusMessage
                }
            }
        case actionTypes.ADMIN_SET_QPAPER_DATA:
            return {
                ...state,
                inputFields: {
                    ...state.inputFields,
                    qpaperData: action.qpaperData
                }
            }
        case actionTypes.ADMIN_CLEAR_QPAPER_DATA:
            return {
                ...state,
                inputFields: {
                    ...state.inputFields,
                    qpaperData: null
                }
            }
        default:
            return state;
    }
}

export default reducer;