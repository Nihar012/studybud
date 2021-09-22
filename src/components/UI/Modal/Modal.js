import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';
import CSSTransition from 'react-transition-group/CSSTransition';

const modal = props => {

    let modalClassNames = [classes.Modal];
    let enterActiveClass = null;
    let exitActiveClass = null;

    if(props.auth){
        modalClassNames.push(classes.AuthModal)
        enterActiveClass = classes.OpenAuthModal;
        exitActiveClass = classes.CloseAuthModal;
    }
    
    if(props.edit){
        modalClassNames.push(classes.EditModal);
        enterActiveClass = classes.OpenEditModal;
        exitActiveClass = classes.CloseEditModal;
    }

    if(props.dataEditor){
        modalClassNames.push(classes.DataEditorModal);
        enterActiveClass = classes.OpenDataEditorModal;
        exitActiveClass = classes.CloseDataEditorModal;
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} closed={props.closed} />
            <CSSTransition 
                in={props.show}
                timeout={200}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterActive: enterActiveClass,
                    exitActive: exitActiveClass
                }} >                
                <div className={modalClassNames.join(' ')} >
                <div className={classes.ModalHeading}>{props.ModalHeading}</div>
                    {props.children}
                </div>
            </CSSTransition>
        </React.Fragment>

    )
}

export default modal;