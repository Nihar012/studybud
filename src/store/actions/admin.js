import * as actionTypes from './actions';
import axios from 'axios';
import { createQpaperData, validateQpaperData } from '../../utilities/QpaperData';
import { app } from '../../base';

const qpaperStorageRef = app.storage().ref('qpapers/');
const syllabusStorageRef = app.storage().ref('syllabus/');

export const adminOpenModal = () => {
    return {
        type: actionTypes.ADMIN_OPEN_MODAL
    }
}

export const adminCloseModal = () => {
    return {
        type: actionTypes.ADMIN_CLOSE_MODAL
    }
}

export const adminSelectStream = (stream) => {
    return {
        type: actionTypes.ADMIN_SELECT_STREAM,
        stream: stream
    }
}

export const adminSetStreams = (streams) => {
    return {
        type: actionTypes.ADMIN_SET_STREAMS,
        streams: streams
    }
}

export const adminGetStreams = () => {
    return dispatch => {
        axios.get('https://studybud-42ff1.firebaseio.com/streams.json')
            .then(response => {
                let streams = [];
                for (let key in response.data) {
                    streams.push({
                        ...response.data[key],
                        streamKey: key
                    })
                }
                dispatch(adminSetStreams(streams));
            });
    }
}

export const adminAddStream = (stream, idToken) => {
    return dispatch => {
        axios.post(`https://studybud-42ff1.firebaseio.com/streams.json?auth=${idToken}`, stream)
            .then(() => {
                dispatch(adminCloseModal());
                dispatch(adminGetStreams());
            });
    }
}

export const adminDeleteStream = (streamKey, idToken) => {
    return dispatch => {
        axios.delete(`https://studybud-42ff1.firebaseio.com/streams/${streamKey}.json?auth=${idToken}`)
            .then(() => {
                axios.delete(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}.json?auth=${idToken}`)
                    .then(() => {
                        axios.delete(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}.json?auth=${idToken}`)
                            .then(() => {
                                dispatch(adminGetStreams());
                            });
                    });
            });
    }
}

export const adminEditStream = (streamKey, stream, idToken) => {
    return dispatch => {
        axios.put(`https://studybud-42ff1.firebaseio.com/streams/${streamKey}.json?auth=${idToken}`, stream)
            .then(() => {
                dispatch(adminCloseModal());
                dispatch(adminGetStreams());
            })
    }
}


export const adminSelectSubject = (subject) => {
    return {
        type: actionTypes.ADMIN_SELECT_SUBJECT,
        subject: subject
    }
}

export const adminSetSubjects = (subjects) => {
    return {
        type: actionTypes.ADMIN_SET_SUBJECTS,
        subjects: subjects
    }
}

export const adminGetSubjects = (streamKey) => {
    return dispatch => {
        axios.get(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}.json`)
            .then(response => {
                let subjects = [];
                for (let key in response.data) {
                    subjects.push({
                        ...response.data[key],
                        subjectKey: key
                    })
                }
                dispatch(adminSetSubjects(subjects));
            });
    }
}

export const adminAddSubject = (streamKey, subject, idToken) => {
    return dispatch => {
        axios.post(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}.json?auth=${idToken}`, subject)
            .then(() => {
                axios.get(`https://studybud-42ff1.firebaseio.com/streams/${streamKey}/extraDetail.json`)
                    .then(res => {
                        let extraDetail = +res.data + 1;
                        axios.put(`https://studybud-42ff1.firebaseio.com/streams/${streamKey}/extraDetail.json?auth=${idToken}`, `${extraDetail}`)
                            .then(() => {
                                dispatch(adminCloseModal());
                                dispatch(adminGetSubjects(streamKey));
                            });
                    });
            });
    }
}

export const adminDeleteSubject = (streamKey, subjectKey, idToken) => {
    return dispatch => {
        axios.delete(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}/${subjectKey}.json?auth=${idToken}`)
            .then(() => {
                axios.get(`https://studybud-42ff1.firebaseio.com/streams/${streamKey}/extraDetail.json`)
                    .then(res => {
                        let extraDetail = +res.data - 1;
                        axios.put(`https://studybud-42ff1.firebaseio.com/streams/${streamKey}/extraDetail.json?auth=${idToken}`, `${extraDetail}`)
                            .then(() => {
                                axios.delete(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}/${subjectKey}.json?auth=${idToken}`)
                                    .then(() => {
                                        dispatch(adminGetSubjects(streamKey));
                                    });
                            });
                    });

            });
    }
}

export const adminEditSubject = (streamKey, subjectKey, subject, idToken) => {
    return dispatch => {
        axios.put(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}/${subjectKey}.json?auth=${idToken}`, subject)
            .then(() => {
                dispatch(adminCloseModal());
                dispatch(adminGetSubjects(streamKey));
            });
    }
}


export const adminSelectQpaper = (qpaper) => {
    return {
        type: actionTypes.ADMIN_SELECT_QPAPER,
        qpaper: qpaper
    }
}

export const adminSetQpapers = (qpapers) => {
    return {
        type: actionTypes.ADMIN_SET_QPAPERS,
        qpapers: qpapers
    }
}

export const adminGetQpapers = (streamKey, subjectKey) => {
    return dispatch => {
        axios.get(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}/${subjectKey}.json`)
            .then(response => {
                let qpapers = [];
                for (let key in response.data) {
                    qpapers.push({
                        ...response.data[key],
                        qpaperKey: key
                    })
                }
                dispatch(adminSetQpapers(qpapers));
            });
    }
}

export const adminAddQpaperFile = (streamKey, subjectKey, qpaperKey, qpaper, file, idToken) => {
    return dispatch => {
        let filename = qpaper.id + '.jpg';
        filename = filename.replace(/[/]/g, '_');
        const fileRef = qpaperStorageRef.child(filename);
        fileRef.put(file)
            .then(() => {
                fileRef.getDownloadURL()
                    .then((response) => {
                        const fileDetails = { downloadURL: response, filename: filename };
                        axios.patch(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}/${subjectKey}/${qpaperKey}.json?auth=${idToken}`, fileDetails)
                            .then(() => {
                                dispatch(adminCloseModal());
                                dispatch(adminGetQpapers(streamKey, subjectKey));
                            })
                    })
            })
    }
}

export const adminAddQpaper = (streamKey, subjectKey, qpaper, file, idToken) => {
    return dispatch => {
        axios.post(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}/${subjectKey}.json?auth=${idToken}`, qpaper)
            .then((response) => {
                const qpaperKey = response.data.name;
                axios.get(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}/${subjectKey}/extraDetail.json`)
                    .then(res => {
                        const extraDetail = +res.data + 1;
                        axios.put(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}/${subjectKey}/extraDetail.json?auth=${idToken}`, `${extraDetail}`)
                            .then(() => {
                                dispatch(adminAddQpaperFile(streamKey, subjectKey, qpaperKey, qpaper, file, idToken));
                            });
                    });
            });
    }
}

export const adminDeleteQpaperFile = (streamKey, subjectKey, filename) => {
    return dispatch => {
        const fileRef = qpaperStorageRef.child(filename);
        fileRef.delete()
            .then(() => {
                dispatch(adminGetQpapers(streamKey, subjectKey));
            })
    }
}

export const adminDeleteQpaper = (streamKey, subjectKey, qpaperKey, filename, idToken) => {
    return dispatch => {
        axios.delete(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}/${subjectKey}/${qpaperKey}.json?auth=${idToken}`)
            .then(() => {
                axios.get(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}/${subjectKey}/extraDetail.json`)
                    .then(res => {
                        let extraDetail = +res.data - 1;
                        axios.put(`https://studybud-42ff1.firebaseio.com/subjects/${streamKey}/${subjectKey}/extraDetail.json?auth=${idToken}`, `${extraDetail}`)
                            .then(() => {
                                dispatch(adminDeleteQpaperFile(streamKey, subjectKey, filename));
                            });
                    });
            });
    }
}

export const adminEditQpaper = (streamKey, subjectKey, qpaperKey, qpaper, idToken) => {
    return dispatch => {
        axios.patch(`https://studybud-42ff1.firebaseio.com/qpapers/${streamKey}/${subjectKey}/${qpaperKey}.json?auth=${idToken}`, qpaper)
            .then(() => {
                dispatch(adminCloseModal());
                dispatch(adminGetQpapers(streamKey, subjectKey));
            });
    }
}


export const adminSelectSyllabus = (syllabus) => {
    return {
        type: actionTypes.ADMIN_SELECT_SYLLABUS,
        syllabus: syllabus
    }
}

export const adminSetSyllabus = (syllabus) => {
    return {
        type: actionTypes.ADMIN_SET_SYLLABUS,
        syllabus: syllabus
    }
}

export const adminGetSyllabus = (streamKey, subjectKey) => {
    return dispatch => {
        axios.get(`https://studybud-42ff1.firebaseio.com/syllabus/${streamKey}/${subjectKey}.json`)
            .then(response => {
                let syllabus = [];
                for (let key in response.data) {
                    syllabus.push({
                        ...response.data[key],
                        syllabusKey: key
                    })
                }
                dispatch(adminSetSyllabus(syllabus));
            });
    }
}

export const adminAddSyllabus = (streamKey, subjectKey, syllabus, idToken) => {
    return dispatch => {
        axios.post(`https://studybud-42ff1.firebaseio.com/syllabus/${streamKey}/${subjectKey}.json?auth=${idToken}`, syllabus)
            .then(() => {
                dispatch(adminCloseModal());
                dispatch(adminGetSyllabus(streamKey, subjectKey));
            });
    }
}

export const adminDeleteSyllabus = (streamKey, subjectKey, syllabusKey, idToken) => {
    return dispatch => {
        axios.delete(`https://studybud-42ff1.firebaseio.com/syllabus/${streamKey}/${subjectKey}/${syllabusKey}.json?auth=${idToken}`)
            .then(() => {
                dispatch(adminGetSyllabus(streamKey, subjectKey));
            });
    }
}

export const adminEditSyllabus = (streamKey, subjectKey, syllabusKey, syllabus, idToken) => {
    return dispatch => {
        axios.put(`https://studybud-42ff1.firebaseio.com/syllabus/${streamKey}/${subjectKey}/${syllabusKey}.json?auth=${idToken}`, syllabus)
            .then(() => {
                dispatch(adminCloseModal());
                dispatch(adminGetQpapers(streamKey, subjectKey));
            });
    }
}


export const adminChangeInputfield = (fieldname, value) => {
    return {
        type: actionTypes.ADMIN_CHANGE_INPUTFIELD,
        fieldname: fieldname,
        value: value
    }
}

export const adminEditInit = (inputFields) => {
    return {
        type: actionTypes.ADMIN_EDIT_INIT,
        inputFields: inputFields
    }
}

export const adminChangeDataCreatorStatus = (status, statusMessage) => {
    return {
        type: actionTypes.ADMIN_CHANGE_DATA_CREATOR_STATUS,
        status: status,
        statusMessage: statusMessage
    }
}

export const adminSetQpaperData = (qpaperData) => {
    return {
        type: actionTypes.ADMIN_SET_QPAPER_DATA,
        qpaperData: qpaperData
    }
}

export const adminValidateQpaperData = (qpaperData, patternType) => {
    return dispatch => {
        dispatch(adminChangeDataCreatorStatus('running', 'Validating Data Format'));
        const validity = validateQpaperData(qpaperData, patternType);
        setTimeout(() => {
            if (validity.isValid) {
                dispatch(adminSetQpaperData(qpaperData));
                dispatch(adminChangeDataCreatorStatus('success', 'Data Accepted'));
            } else {
                dispatch(adminChangeDataCreatorStatus('danger', validity.errorMessage));
            }
        }, 500);
    }
}

export const adminCreateQpaperData = (text, patternType) => {
    return dispatch => {
        dispatch(adminChangeDataCreatorStatus('running', 'Creating Data'));
        setTimeout(() => {
            dispatch(adminValidateQpaperData(createQpaperData(text, patternType), patternType));
        }, 1000);
    }
}

export const adminClearQpaperData = () => {
    return {
        type: actionTypes.ADMIN_CLEAR_QPAPER_DATA
    }
}