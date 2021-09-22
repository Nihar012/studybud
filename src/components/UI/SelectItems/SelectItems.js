import React from 'react';
import SelectItem from './SelectItem/SelectItem';
import classes from './SelectItems.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const selectItems = props => {

    const selectItemHandler = (itemType, id) => {
        console.log(itemType, id);
        props.onSelectItem(itemType, id);
        props.onGetItems(itemType);
        setTimeout(() => {
            props.closed();
        }, 200)
    };

    let items = null;
    switch (props.patternType ? props.patternType : props.itemType) {
        case 'streams':
            items = props.item.map(stream => {
                return <SelectItem
                    itemType={props.itemType}
                    key={stream.id}
                    details={stream}
                    selected={stream.isSelected}
                    clicked={() => selectItemHandler(props.itemType, stream.id)} />
            });
            break;
        case 'subjects':
            items = props.item.map(subject => {
                return <SelectItem
                    itemType={props.itemType}
                    key={subject.id}
                    details={subject}
                    selected={subject.isSelected}
                    clicked={() => selectItemHandler(props.itemType, subject.id)} />
            });
            break;
        case 'qpapers':
            items = props.item.map(qpaper => {
                return <SelectItem
                    itemType={props.itemType}
                    key={qpaper.id}
                    details={qpaper}
                    selected={qpaper.isSelected}
                    clicked={() => selectItemHandler(props.itemType, qpaper.id)} />
            });
            break;
        case 'pattern 1':
            let pattern1Qpapers = props.item.filter(qpaper => qpaper.patternType === 'pattern 1');
            items = pattern1Qpapers.map(qpaper => {
                return <SelectItem
                    itemType={props.itemType}
                    key={qpaper.id}
                    details={qpaper}
                    selected={qpaper.isSelected}
                    clicked={() => selectItemHandler(props.itemType, qpaper.id)} />
            });
            break;
        case 'pattern 2':
            let pattern2Qpapers = props.item.filter(qpaper => qpaper.patternType === 'pattern 2');
            items = pattern2Qpapers.map(qpaper => {
                return <SelectItem
                    itemType={props.itemType}
                    key={qpaper.id}
                    details={qpaper}
                    selected={qpaper.isSelected}
                    clicked={() => selectItemHandler(props.itemType, qpaper.id)} />
            });
            break;
        case 'syllabus':
            items = props.item.map(syllabus => {
                return <SelectItem
                    itemType={props.itemType}
                    key={syllabus.id}
                    details={syllabus}
                    selected={syllabus.isSelected}
                    clicked={() => selectItemHandler(props.itemType, syllabus.id)} />
            });
            break;
        default:
            items = null;
    }

    return (
        <div className={classes.SelectItems} >
            {items}
        </div>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        onGetItems: (itemType) => dispatch(actions.getItems(itemType)),
        onSelectItem: (itemType, itemId) => dispatch(actions.onSelect(itemType, itemId))
    }
};

export default connect(null, mapDispatchToProps)(selectItems);