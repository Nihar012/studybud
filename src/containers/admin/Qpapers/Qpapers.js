import React, { Component } from 'react';
import SelectItem from '../../../components/UI/SelectItems/SelectItem/SelectItem';
import classes from './Qpapers.css';
import AddCard from '../../../components/admin/AddCard/AddCard';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from '../../../components/admin/Forms/Form';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
import Tesseract from 'tesseract.js';
import DataEditor from '../../../components/admin/DataEditor/DataEditor';

class Qpapers extends Component {

    state = {
        text: '',
        showDataEditor: false
    };

    componentDidMount() {
        if (this.props.selectedSubject)
            this.props.onGetQpapers(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey)
    }

    addingQpaperHandler = () => {
        this.props.onModalOpen();
    }

    modalClosedHandler = () => {
        this.props.onChangeDataCreatorStatus('idle', 'No Data');
        this.props.onModalClose();
        this.setState({ text: '' });
    }

    convertToTextHandler = async (upload) => {     
        this.props.onChangeDataCreatorStatus('running', 'Recognizing Text');   
        const result = await Tesseract.recognize(
            upload,
            'eng'
        );
        console.log(result.text);
        this.props.onChangeDataCreatorStatus('success', 'Data Scanned');
        this.setState({ text: result.text.toLowerCase(), showDataEditor: true });
    }

    inputChangedHandler = (event, fieldname) => {
        if (fieldname === 'dataCreator') {
            const upload = URL.createObjectURL(event.target.files[0]);            
            this.convertToTextHandler(upload);
        }
        else if (fieldname === 'uploadedFile') {
            const file = event.target.files[0];
            this.props.onChangeInputfield(fieldname, file);                      

            // axios({
            //     url: 'https://firebasestorage.googleapis.com/v0/b/studybud-42ff1.appspot.com/o/qpapers%2Fqpaper_filter_3.png?alt=media&token=18dfe13e-fb4f-4fae-97bc-7464c7155092',
            //     method: 'GET',
            //     responseType: 'blob'
            // })
            // .then((response) => {
            //     const url = URL.createObjectURL(new Blob([response.data]));
            //     const downloadLink = document.createElement('a');
            //     downloadLink.href = url;
            //     downloadLink.setAttribute('download', 'qpaper.png');
            //     document.body.appendChild(downloadLink);
            //     downloadLink.click();
            // })
        }
        else if (fieldname === 'clearUploadedFile') {
            this.props.onChangeInputfield('uploadedFile', null);
        }
        else if (fieldname === 'pattern1' || fieldname === 'pattern2') {
            this.props.onChangeInputfield('patternType', fieldname);
        }
        else {
            this.props.onChangeInputfield(fieldname, event.target.value);
        }
    }

    showDataEditorHandler = (event) => {
        event.preventDefault();
        this.setState({ showDataEditor: true });
    }

    closeDataEditorHandler = () => {
        this.setState({ showDataEditor: false });
    }

    dataEditorChangedHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    dataEditorCancelHandler = () => {
        this.props.onClearQpaperData();
        this.props.onChangeDataCreatorStatus('idle', 'No Data');
        this.setState({ text: '', showDataEditor: false });
    }

    dataEditorSubmitHandler = () => {
        this.props.onCreateQpaperData(this.state.text, this.props.patternType);
        this.setState({ showDataEditor: false });
    }

    selectHandler = (qpaper) => {
        this.props.onSelectQpaper(qpaper);
    }

    editHandler = (qpaper) => {
        const inputFields = {
            abbrevation: qpaper.abbrevation,
            year: qpaper.year,
            extraDetail: qpaper.extraDetail,
            id: qpaper.id,
            patternType: qpaper.patternType,
            data: qpaper.data,            
            qpaperKey: qpaper.qpaperKey,
            editing: true
        };
        this.props.onEditInit(inputFields);
        this.props.onModalOpen();
    }

    deleteHandler = (qpaperKey, filename) => {
        this.props.onDeleteQpaper(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey, qpaperKey, filename, this.props.idToken);
    }    

    submitHandler = (event) => {
        event.preventDefault();
        const qpaper = {
            abbrevation: this.props.abbrevation,
            year: this.props.year,
            extraDetail: this.props.extraDetail,
            id: this.props.id ? this.props.id : new Date(),
            patternType: this.props.patternType,
            data: this.props.qpaperData
        }
        if (this.props.editing) {
            this.props.onEditQpaper(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey, this.props.qpaperKey, qpaper, this.props.idToken);
        } else {
            this.props.onAddQpaper(this.props.selectedStream.streamKey, this.props.selectedSubject.subjectKey, qpaper, this.props.uploadedFile, this.props.idToken);
        }
    }

    render() {

        let content = <Redirect to="/admin/subjects" />;
        if (this.props.selectedSubject) {
            content = (
                <React.Fragment>
                    <Modal 
                        edit 
                        show={this.props.showModal} 
                        closed={this.modalClosedHandler}
                        ModalHeading={this.props.editing ? 'Edit Question Paper' : 'New Question Paper'} >
                        <Form
                            itemType="qpapers"
                            submitted={this.submitHandler}
                            changed={this.inputChangedHandler}
                            abbrevation={this.props.abbrevation}
                            year={this.props.year}
                            extraDetail={this.props.extraDetail}
                            patternType={this.props.patternType}
                            uploadedFile={this.props.uploadedFile}
                            showDataEditor={this.showDataEditorHandler} />
                    </Modal>
                    <Modal dataEditor show={this.state.showDataEditor} >
                        <DataEditor 
                            value={this.state.text}
                            closed={this.closeDataEditorHandler}
                            changed={this.dataEditorChangedHandler}
                            cancel={this.dataEditorCancelHandler}
                            submit={this.dataEditorSubmitHandler} />
                    </Modal>
                    <div className={classes.Qpapers}>
                        <AddCard clicked={this.addingQpaperHandler} />
                        {this.props.qpapers.map(qpaper => {
                            return <SelectItem
                                admin
                                edit={() => this.editHandler(qpaper)}
                                delete={() => this.deleteHandler(qpaper.qpaperKey, qpaper.filename)}
                                clicked={() => this.selectHandler(qpaper)}
                                key={qpaper.id}
                                details={qpaper} />
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
        qpapers: state.admin.qpapers,
        selectedStream: state.admin.selectedItems.streams,
        selectedSubject: state.admin.selectedItems.subjects,
        showModal: state.admin.showModal,
        idToken: state.auth.idToken,
        abbrevation: state.admin.inputFields.abbrevation,
        year: state.admin.inputFields.year,
        extraDetail: state.admin.inputFields.extraDetail,
        id: state.admin.inputFields.id,
        patternType: state.admin.inputFields.patternType,
        qpaperData: state.admin.inputFields.qpaperData,
        qpaperKey: state.admin.inputFields.qpaperKey,
        uploadedFile: state.admin.inputFields.uploadedFile,
        editing: state.admin.inputFields.editing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalOpen: () => dispatch(actions.adminOpenModal()),
        onModalClose: () => dispatch(actions.adminCloseModal()),
        onGetQpapers: (streamKey, subjectKey) => dispatch(actions.adminGetQpapers(streamKey, subjectKey)),
        onAddQpaper: (streamKey, subjectKey, qpaper, file, idToken) => dispatch(actions.adminAddQpaper(streamKey, subjectKey, qpaper, file, idToken)),
        onSelectQpaper: (qpaper) => dispatch(actions.adminSelectQpaper(qpaper)),
        onDeleteQpaper: (streamKey, subjectKey, qpaperKey, filename, idToken) => dispatch(actions.adminDeleteQpaper(streamKey, subjectKey, qpaperKey, filename , idToken)),
        onEditQpaper: (streamKey, subjectKey, qpaperKey, qpaper, idToken) => dispatch(actions.adminEditQpaper(streamKey, subjectKey, qpaperKey, qpaper, idToken)),
        onChangeInputfield: (fieldname, value) => dispatch(actions.adminChangeInputfield(fieldname, value)),
        onEditInit: (inputFields) => dispatch(actions.adminEditInit(inputFields)),
        onChangeDataCreatorStatus: (status, statusMessage) => dispatch(actions.adminChangeDataCreatorStatus(status, statusMessage)),
        onCreateQpaperData: (text, patternType) => dispatch(actions.adminCreateQpaperData(text, patternType)),
        onClearQpaperData: () => dispatch(actions.adminClearQpaperData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Qpapers);