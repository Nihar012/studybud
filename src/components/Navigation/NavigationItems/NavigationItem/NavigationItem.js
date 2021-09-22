import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = props => {

    return (
        <li 
            className={[classes.NavigationItem, props.admin ? classes.Admin : '', props.noIcon ? classes.NoIcon : ''].join(' ')}>
            <NavLink
                to={props.link}
                activeClassName={classes.Active}
                exact={props.exact} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path className={classes.Icon} d={props.d} />
                </svg>
                <div className={classes.Description}>
                    {props.children}
                </div>
            </NavLink>
        </li>
    )
}

export default navigationItem;