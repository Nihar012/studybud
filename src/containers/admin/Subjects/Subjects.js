import React, { Component } from 'react';
import SelectItem from '../../../components/UI/SelectItems/SelectItem/SelectItem';
import classes from './Subjects.css';
import AddCard from '../../../components/admin/AddCard/AddCard';
import { connect } from 'react-redux';
import Form from '../../../components/admin/Forms/Form';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Subjects extends Component {

    state = {
        abbrevation: '',
        fullname: '',

        extraDetail: 0,
        id: '',
        subjectKey: '',
        editing: false
    }

    componentDidMount() {
        if (this.props.selectedStream)
            this.props.onGetSubjects(this.props.selectedStream.streamKey);
    }

    addingSubjectHandler = () => {
        this.props.onModalOpen();
    }

    modalClosedHandler = () => {
        this.props.onModalClose();
    }

    inputChangedHandler = (event, fieldname) => {
        this.props.onChangeInputfield(fieldname, event.target.value);
    }

    submitHandler = (event) => {
        event.preventDefault();
        const subject = {
            abbrevation: this.props.abbrevation,
            fullname: this.props.fullname,
            extraDetail: this.props.extraDetail ? this.props.extraDetail : 0,
            id: this.props.id ? this.props.id : new Date()
        }
        if (this.props.editing) {
            this.props.onEditSubject(this.props.selectedStream.streamKey, this.props.subjectKey, subject, this.props.idToken);
        } else {
            this.props.onAddSubject(this.props.selectedStream.streamKey, subject, this.props.idToken);
        }
    }

    selectHandler = (subject) => {
        this.props.onSelectSubject(subject);
        this.props.history.push('/admin/qpapers')
    }

    editHandler = (subject) => {
        const inputFields = {
            abbrevation: subject.abbrevation,
            fullname: subject.fullname,
            extraDetail: subject.extraDetail,
            id: subject.id,
            subjectKey: subject.subjectKey,
            editing: true
        };
        this.props.onEditInit(inputFields);
        this.props.onModalOpen();
    }

    deleteHandler = (subjectKey) => {
        this.props.onDeleteSubject(this.props.selectedStream.streamKey, subjectKey, this.props.idToken)
    }

    render() {

        let modalHeading = <h2>Add new subject</h2>;
        if (this.props.editing) {
            modalHeading = <h2>Edit</h2>;
        }

        let content = <Redirect to="/admin/streams" />;
        if (this.props.selectedStream) {
            content = (
                <React.Fragment>
                    <Modal edit show={this.props.showModal} closed={this.modalClosedHandler} >
                        {modalHeading}
                        <Form
                            itemType="subjects"
                            submitted={this.submitHandler}
                            changed={this.inputChangedHandler}
                            abbrevation={this.props.abbrevation}
                            fullname={this.props.fullname} />
                    </Modal>
                    <div className={classes.Subjects}>
                        <AddCard clicked={this.addingSubjectHandler} />
                        {this.props.subjects.map(subject => {
                            return <SelectItem
                                admin
                                edit={() => this.editHandler(subject)}
                                delete={() => this.deleteHandler(subject.subjectKey)}
                                clicked={() => this.selectHandler(subject)}
                                key={subject.id}
                                details={subject} />
                        })}
                    </div>
                </React.Fragment>
            );
        }

        return content;
    }
}


const mapStateToProps = state => {
    return {
        subjects: state.admin.subjects,
        selectedStream: state.admin.selectedItems.streams,
        showModal: state.admin.showModal,
        idToken: state.auth.idToken,
        abbrevation: state.admin.inputFields.abbrevation,
        fullname: state.admin.inputFields.fullname,
        extraDetail: state.admin.inputFields.extraDetail,
        id: state.admin.inputFields.id,
        subjectKey: state.admin.inputFields.subjectKey,
        editing: state.admin.inputFields.editing,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalOpen: () => dispatch(actions.adminOpenModal()),
        onModalClose: () => dispatch(actions.adminCloseModal()),
        onGetSubjects: (streamKey) => dispatch(actions.adminGetSubjects(streamKey)),
        onAddSubject: (streamKey, subject, idToken) => dispatch(actions.adminAddSubject(streamKey, subject, idToken)),
        onSelectSubject: (subject) => dispatch(actions.adminSelectSubject(subject)),
        onDeleteSubject: (streamKey, subjectKey, idToken) => dispatch(actions.adminDeleteSubject(streamKey, subjectKey, idToken)),
        onEditSubject: (streamKey, subjectKey, subject, idToken) => dispatch(actions.adminEditSubject(streamKey, subjectKey, subject, idToken)),
        onChangeInputfield: (fieldname, value) => dispatch(actions.adminChangeInputfield(fieldname, value)),
        onEditInit: (inputFields) => dispatch(actions.adminEditInit(inputFields))    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);