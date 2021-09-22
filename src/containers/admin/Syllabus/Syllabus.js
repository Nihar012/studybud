import React, { Component } from 'react';
import SelectItem from '../../../components/UI/SelectItems/SelectItem/SelectItem';
import classes from './Syllabus.css';
import AddCard from '../../../components/admin/AddCard/AddCard';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from '../../../components/admin/Forms/Form';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';

class Syllabus extends Component {

    state = {
        abbrevation: '',
        year: '',
        extraDetail: '',

        id: '',
        syllabusKey: '',
        editing: false
    }

    componentDidMount() {
        if (this.props.selectedSubject)
            this.props.onGetSyllabus(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey)
    }

    addingSyllabusHandler = () => {
        this.props.onModalOpen();
    }

    modalClosedHandler = () => {
        this.props.onModalClose();
        this.setState({ abbrevation: '', year: '', extraDetail: '', id: '', syllabusKey: '', editing: false });
    }

    inputChangedHandler = (event, fieldName) => {
        if (fieldName === 'abbrevation')
            this.setState({ abbrevation: event.target.value })
        if (fieldName === 'year')
            this.setState({ year: event.target.value })
        if (fieldName === 'extraDetail')
            this.setState({ extraDetail: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const syllabus = {
            abbrevation: this.state.abbrevation,
            year: this.state.year,
            extraDetail: this.state.extraDetail,
            id: this.state.id ? this.state.id : new Date()
        }
        if (this.state.editing) {
            this.props.onEditSyllabus(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey, this.state.syllabusKey, syllabus, this.props.idToken);
        } else {
            this.props.onAddSyllabus(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey, syllabus, this.props.idToken);
        }
        this.setState({ abbrevation: '', year: '', extraDetail: '', id: '', syllabusKey: '', editing: false });
    }

    selectHandler = (syllabus) => {
        this.props.onSelectSyllabus(syllabus);
    }

    editHandler = (syllabus) => {
        this.setState({
            abbrevation: syllabus.abbrevation,
            year: syllabus.year,
            extraDetail: syllabus.extraDetail,
            id: syllabus.id,
            syllabusKey: syllabus.syllabusKey,
            editing: true
        });
        this.props.onModalOpen();
    }

    deleteHandler = (syllabusKey) => {
        this.props.onDeleteSyllabus(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey, syllabusKey, this.props.idToken);
    }

    render() {

        let modalHeading = <h2>Add new syllabus</h2>;
        if (this.state.editing) {
            modalHeading = <h2>Edit</h2>;
        }

        let content = <Redirect to="/admin/subjects" />;
        if (this.props.selectedSubject) {
            content = (
                <React.Fragment>
                    <Modal edit show={this.props.showModal} closed={this.modalClosedHandler} >
                        {modalHeading}
                        <Form
                            itemType="qpapers"
                            submitted={this.submitHandler}
                            changed={this.inputChangedHandler}
                            abbrevation={this.state.abbrevation}
                            year={this.state.year}
                            extraDetail={this.state.extraDetail} />
                    </Modal>
                    <div className={classes.Syllabus}>
                        <AddCard clicked={this.addingSyllabusHandler} />
                        {this.props.syllabus.map(syl => {
                            return <SelectItem
                                admin
                                edit={() => this.editHandler(syl)}
                                delete={() => this.deleteHandler(syl.syllabusKey)}
                                clicked={() => this.selectHandler(syl)}
                                key={syl.id}
                                details={syl} />
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
        syllabus: state.admin.syllabus,
        selectedStream: state.admin.selectedItems.streams,
        selectedSubject: state.admin.selectedItems.subjects,
        showModal: state.admin.showModal,
        idToken: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalOpen: () => dispatch(actions.adminOpenModal()),
        onModalClose: () => dispatch(actions.adminCloseModal()),
        onGetSyllabus: (streamKey, subjectKey) => dispatch(actions.adminGetSyllabus(streamKey, subjectKey)),
        onAddSyllabus: (streamKey, subjectKey, syllabus, idToken) => dispatch(actions.adminAddSyllabus(streamKey, subjectKey, syllabus, idToken)),
        onSelectSyllabus: (syllabus) => dispatch(actions.adminSelectSyllabus(syllabus)),
        onDeleteSyllabus: (streamKey, subjectKey, syllabusKey, idToken) => dispatch(actions.adminDeleteSyllabus(streamKey, subjectKey, syllabusKey, idToken)),
        onEditSyllabus: (streamKey, subjectKey, syllabusKey, syllabus, idToken) => dispatch(actions.adminEditSyllabus(streamKey, subjectKey, syllabusKey, syllabus, idToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Syllabus);