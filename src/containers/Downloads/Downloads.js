import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectItems from '../../components/UI/SelectItems/SelectItems';
import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import InputForm from '../../components/InputForm/InputForm';
import Button from '../../components/UI/Button/Button';
import SelectItem from '../../components/UI/SelectItems/SelectItem/SelectItem';
import classes from './Downloads.css';
import CSSTransition from 'react-transition-group/CSSTransition';

class Downloads extends Component {

    state = {
        show: false
    }

    constructor(props) {
        super(props);
        this.props.onGetItems('initial');
        this.props.onCloseSelectItemsUI();
    }

    selectingItemHandler = (itemType) => {
        this.props.onSelectItemUI(itemType);
    }

    setItemOptionsHandler = (itemType) => {
        let patternType = null;
        if (this.props.pattern1Show) {
            patternType = 'pattern 1';
        }
        if (this.props.pattern2Show) {
            patternType = 'pattern 2';
        }
        return (
            <SelectItems
                item={this.props[itemType]}
                itemType={itemType}
                patternType={patternType}
                showBackdrop={this.props.showBackdrop}
                closed={itemType === 'qpapers' ? () => { } : this.closeSelectItemsHandler} />
        );
    }

    closeSelectItemsHandler = () => {
        this.props.onCloseSelectItemsUI();
    }

    togglePatternHandler = (pattern) => {
        this.props.onTogglePatternUI(pattern);
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    componentDidMount() {
        this.setState({ show: true })
    }

    render() {

        let itemOptions = null;
        let modalHeading = null;
        if (this.props.selectingStream) {
            itemOptions = this.setItemOptionsHandler('streams');
            modalHeading = <h3 style={{ textAlign: 'center' }} >Streams</h3>;
        }
        if (this.props.selectingSubject) {
            itemOptions = this.setItemOptionsHandler('subjects');
            modalHeading = <h3 style={{ textAlign: 'center' }} >Subjects</h3>;
        }

        let downloadItems = this.props.qpapers.map(qpaper => {
            return <SelectItem
                downloads
                key={qpaper.id}
                details={qpaper} />
        });
        if (this.props.pattern1Show) {
            let pattern1Qpapers = this.props.qpapers.filter(qpaper => qpaper.patternType === 'pattern 1');
            downloadItems = pattern1Qpapers.map(qpaper => {
                return <SelectItem
                    downloads
                    key={qpaper.id}
                    details={qpaper} />
            });
        }
        if (this.props.pattern2Show) {
            let pattern2Qpapers = this.props.qpapers.filter(qpaper => qpaper.patternType === 'pattern 2');
            downloadItems = pattern2Qpapers.map(qpaper => {
                return <SelectItem
                    downloads
                    key={qpaper.id}
                    details={qpaper} />
            });
        }


        return (
            <React.Fragment>
                {this.props.showModal ?
                    <Modal
                        show={this.props.showModal}
                        closed={this.closeSelectItemsHandler} >
                        {modalHeading}
                        {itemOptions}</Modal>
                    : null}
                <CSSTransition
                    in={this.state.show}
                    timeout={200}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enterActive: classes.OpenPage,
                        exitActive: classes.ClosePage
                    }} >
                    <div>
                        <InputForm
                            hidden
                            disable
                            onSubmit={this.submitHandler}
                            submitTitle="Downloads"
                            openSelect={this.selectingItemHandler}
                            selectedItems={this.props.selectedItems} />
                        {/* <p>Output</p> */}
                    </div>
                </CSSTransition>
                <div>
                    <Button
                        btnType="SelectPattern"
                        active={this.props.pattern1Show}
                        clicked={() => this.togglePatternHandler('pattern 1')}>Pattern 1</Button>
                    <Button
                        btnType="SelectPattern"
                        active={this.props.pattern2Show}
                        clicked={() => this.togglePatternHandler('pattern 2')}>Pattern 2</Button>
                </div>

                <div>
                    {downloadItems}
                </div>

            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        streams: state.inputForm.streams,
        subjects: state.inputForm.subjects,
        qpapers: state.inputForm.qpapers,
        syllabus: state.inputForm.syllabus,
        selectedItems: state.inputForm.selectedItems,

        selectingStream: state.inputFormUI.selectingStream,
        selectingSubject: state.inputFormUI.selectingSubject,
        selectingQpapers: state.inputFormUI.selectingQpapers,
        selectingSyllabus: state.inputFormUI.selectingSyllabus,
        showModal: state.inputFormUI.showModal,
        pattern1Show: state.inputFormUI.pattern1Show,
        pattern2Show: state.inputFormUI.pattern2Show
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetItems: (itemType) => dispatch(actions.getItems(itemType)),
        onSelectItemUI: (itemType) => dispatch(actions.uiSelectingItem(itemType)),
        onTogglePatternUI: (pattern) => dispatch(actions.uiTogglePattern(pattern)),
        onCloseSelectItemsUI: () => dispatch(actions.uiCloseSelectItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);