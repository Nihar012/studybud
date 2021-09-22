import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import AdminSideDrawer from '../../components/admin/AdminSideDrawer/AdminSideDrawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Layout extends Component {

    render() {

        let contentClassNames = [classes.Content];
        if(this.props.isAdmin){
            contentClassNames.push(classes.Admin);
        }        

        return (
            <React.Fragment>                
                <SideDrawer isAuth={this.props.isAuth} />
                <Toolbar isAuth={this.props.isAuth} />
                {this.props.isAdmin ? <AdminSideDrawer /> : null}                           
                <main className={contentClassNames.join(' ')} >
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null,
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps)(withRouter(Layout));