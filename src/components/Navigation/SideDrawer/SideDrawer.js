import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = props => {
    return (
        <React.Fragment>
            <div className={classes.SideDrawer} >
                <NavigationItems />
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;