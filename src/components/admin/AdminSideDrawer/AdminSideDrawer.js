import React from 'react';
import classes from './AdminSideDrawer.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';
import CSSTransition from 'react-transition-group/CSSTransition';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const adminSideDrawer = props => {

    let showNav = false;
    if(props.location.pathname === '/admin/qpapers' || props.location.pathname === '/admin/syllabus'){
        showNav = true;
    }

    return (
        <div className={classes.AdminSideDrawer} >

            <div className={classes.PathHolder}>
                <div className={classes.Home}>
                    <NavLink to="/admin/streams" activeClassName={classes.active}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path className={classes.Icon} d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zm-9-7v6h2v-6h-2z" />
                        </svg>
                    </NavLink>
                </div>
                <div className={classes.Path}>
                    <NavLink to="/admin/streams" activeClassName={classes.active}>
                        {props.location.pathname === '/admin/streams' ? 'streams >' : null}
                    </NavLink>
                    <NavLink to="/admin/subjects" activeClassName={classes.active}>
                        {props.selectedStream ? props.selectedStream.abbrevation + ' >' : null}
                    </NavLink>
                    <NavLink to="/admin/qpapers" activeClassName={classes.active}>
                        {props.selectedSubject ? props.selectedSubject.abbrevation + ' >' : null}
                    </NavLink>
                </div>
            </div>

            <CSSTransition 
                mountOnEnter
                unmountOnExit
                in={showNav}
                timeout={200}
                classNames={{
                    enterActive: classes.ShowAdminNav,
                    exitActive: classes.CloseAdminNav
                }} >
                <nav>
                    <NavigationItem
                        link="/admin/qpapers"
                        noIcon
                        admin >Question papers</NavigationItem>
                    <NavigationItem
                        link="/admin/syllabus"
                        noIcon
                        admin >Syllabus</NavigationItem>
                </nav>
            </CSSTransition>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        selectedStream: state.admin.selectedItems.streams,
        selectedSubject: state.admin.selectedItems.subjects
    }
}

export default connect(mapStateToProps)(withRouter(adminSideDrawer));