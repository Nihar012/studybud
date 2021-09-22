import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TopicScore from './containers/TopicScore/TopicScore';
import QuestionBankGenerator from './containers/QuestionBankGenerator/QuestionBankGenerator';
import Downloads from './containers/Downloads/Downloads';
import Help from './containers/Help/Help';
import { Route, Switch } from 'react-router-dom';
import Streams from './containers/admin/Streams/Streams';
import Subjects from './containers/admin/Subjects/Subjects';
import Qpapers from './containers/admin/Qpapers/Qpapers';
import Syllabus from './containers/admin/Syllabus/Syllabus';
import { connect } from 'react-redux';
import Modal from './components/UI/Modal/Modal';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
// import Tesseract from 'tesseract.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.onTryAutoLogIn();
  }

  authCloseHandler = () => {
    this.props.onAuthClose();
  }

  render() {

    let routes = <Switch>
      <Route path="/qbank" component={QuestionBankGenerator} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/" exact component={TopicScore} />
    </Switch>;

    if (this.props.isAuthenticated && this.props.isAdmin) {
      routes = <Switch>
        <Route path="/qbank" component={QuestionBankGenerator} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/admin/streams" component={Streams} />
        <Route path="/admin/subjects" component={Subjects} />
        <Route path="/admin/qpapers" component={Qpapers} />
        <Route path="/admin/syllabus" component={Syllabus} />
        <Route path="/" exact component={TopicScore} />
      </Switch>;
    }

    return (
      <div className="App">
        <Layout>
          <Modal auth show={this.props.showModal} closed={this.authCloseHandler} >
            <Auth />
          </Modal>
          {routes}
        </Layout>
      </div >
    );
  }
}


const mapStateToProps = state => {
  return {
    showModal: state.auth.showModal,
    isAuthenticated: state.auth.idToken !== null,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthClose: () => dispatch(actions.authClose()),
    onTryAutoLogIn: () => dispatch(actions.autoLogIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
