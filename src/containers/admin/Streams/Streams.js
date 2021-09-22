import React, { Component } from 'react';
import SelectItem from '../../../components/UI/SelectItems/SelectItem/SelectItem';
import classes from './Streams.css';
import AddCard from '../../../components/admin/AddCard/AddCard';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import Form from '../../../components/admin/Forms/Form';

class Streams extends Component {    

    componentDidMount() {
        this.props.onGetStreams();
    }

    addingStreamHandler = () => {
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
        const stream = {
            abbrevation: this.props.abbrevation,
            fullname: this.props.fullname,
            extraDetail: this.props.extraDetail ? this.props.extraDetail : 0,
            id: this.props.id ? this.props.id : new Date()
        }
        if (this.props.editing) {
            this.props.onEditStream(this.props.streamKey, stream, this.props.idToken);
        } else {
            this.props.onAddStream(stream, this.props.idToken);
        }        
    }

    selectHandler = (stream) => {
        this.props.onSelectStream(stream);
        this.props.history.push('/admin/subjects');
    }

    editHandler = (stream) => {
        const inputFields = {
            abbrevation: stream.abbrevation,
            fullname: stream.fullname,
            extraDetail: stream.extraDetail,
            id: stream.id,
            streamKey: stream.streamKey,
            editing: true
        };
        this.props.onEditInit(inputFields);
        this.props.onModalOpen();
    }

    deleteHandler = (streamKey) => {
        this.props.onDeleteStream(streamKey, this.props.idToken);
    }

    render() {

        let modalHeading = <h2>Add Stream</h2>;
        if (this.props.editing) {
            modalHeading = <h2>Edit Stream</h2>;
        }

        return (
            <React.Fragment>
                <Modal edit show={this.props.showModal} closed={this.modalClosedHandler} >
                    {modalHeading}
                    <Form
                        itemType="streams"
                        submitted={this.submitHandler}
                        changed={this.inputChangedHandler}
                        abbrevation={this.props.abbrevation}
                        fullname={this.props.fullname} />
                </Modal>
                <div className={classes.Streams}>
                    <AddCard clicked={this.addingStreamHandler} />
                    {this.props.streams.map(stream => {
                        return <SelectItem
                            admin
                            edit={() => this.editHandler(stream)}
                            delete={() => this.deleteHandler(stream.streamKey)}
                            clicked={() => this.selectHandler(stream)}
                            key={stream.id}
                            details={stream} />
                    })}
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        streams: state.admin.streams,
        showModal: state.admin.showModal,
        idToken: state.auth.idToken,
        abbrevation: state.admin.inputFields.abbrevation,
        fullname: state.admin.inputFields.fullname,
        extraDetail: state.admin.inputFields.extraDetail,
        id: state.admin.inputFields.id,
        streamKey: state.admin.inputFields.streamKey,
        editing: state.admin.inputFields.editing,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetStreams: () => dispatch(actions.adminGetStreams()),
        onModalOpen: () => dispatch(actions.adminOpenModal()),
        onModalClose: () => dispatch(actions.adminCloseModal()),
        onAddStream: (stream, idToken) => dispatch(actions.adminAddStream(stream, idToken)),
        onSelectStream: (stream) => dispatch(actions.adminSelectStream(stream)),
        onDeleteStream: (streamKey, idToken) => dispatch(actions.adminDeleteStream(streamKey, idToken)),
        onEditStream: (streamKey, stream, idToken) => dispatch(actions.adminEditStream(streamKey, stream, idToken)),
        onChangeInputfield: (fieldname, value) => dispatch(actions.adminChangeInputfield(fieldname, value)),
        onEditInit: (inputFields) => dispatch(actions.adminEditInit(inputFields))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Streams);