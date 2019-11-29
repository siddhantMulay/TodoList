
//In charge of nested routes, keeping header same across the app, just changing the 
//page content. :)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Common/Header/Header';

//Pages
import Home from './Home';
import Bucket from './Bucket';

class MainIndex extends Component {
    render() {
        const { tasks, currentBucket } = this.props;
        const emptyState = tasks.length > 0 ? false : true;
        const ifInBucket = Object.keys(currentBucket).length > 0 ? true : false;
        let subHeaderText = emptyState ?
            "Nothing's in here... yet"
            : ifInBucket ? currentBucket.total + ' tasks,' + ' ' +
                currentBucket.completed + ' completed' :
                "Now, let's get started, shall we?";

        return (
            <div className="mainIndex">
                <Header
                    homeNav={`${ifInBucket}`}
                    headerText={`${ifInBucket ?
                        currentBucket.name : 'Hello, Human!'}`}
                    subHeaderText={subHeaderText} />
                <Router>
                    <Route exact path='/' component={Home} />
                    <Route exact path={`/bucket/:endpoint`} component={Bucket} />
                </Router>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const taskStore = state.task;
    const globalStore = state.global;
    return {
        tasks: taskStore.tasks,
        currentBucket: globalStore.currentBucket
    }
}

export default connect(mapStateToProps)(MainIndex);