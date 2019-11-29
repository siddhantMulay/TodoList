
//In charge of nested routes, keeping header and footer same across the app, just changing the 
//page content. :)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';

//Pages
import Home from './Home';
import Bucket from './Bucket';

class MainIndex extends Component {
    render() {
        const { tasks } = this.props;
        const emptyState = tasks.length > 0 ? false : true;

        return (
            <div className="mainIndex">
                <Header
                    headerText={`Hello, Human!`}
                    subHeaderText={`${emptyState ?
                        "Nothing's in here... yet" : "Let's get started, shall we?"}`} />
                <Router>
                    <Route path='/index' component={Home} />
                    <Route path='/bucket' component={Bucket} />
                </Router>
                <Footer />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const taskStore = state.task;
    return {
        tasks: taskStore.tasks
    }
}

export default connect(mapStateToProps)(MainIndex);