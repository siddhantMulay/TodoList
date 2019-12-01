
//In charge of nested routes, keeping header same across the app, just changing the 
//page content. :)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Common/Header/Header';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../common/GlobalStyles';

//Pages
import Home from './Home';
import Bucket from './Bucket';


class MainIndex extends Component {

    render() {
        const { tasks, currentBucket, theme } = this.props;
        const emptyState = tasks.length > 0 ? false : true;
        const ifInBucket = window.location.href.indexOf("bucket") > -1 ? true : false;

        let subHeaderText = emptyState ?
            "Nothing's in here... yet"
            : ifInBucket ?
                currentBucket.total === undefined ?
                    'Nothing but a blank canvas here' :
                    currentBucket.total === currentBucket.completed ?
                        'You the dude! Now go sleep or get a beer or something.' :
                        currentBucket.total + ' task(s),' + ' ' +
                        currentBucket.completed + ' completed' :
                "Now, let's get started, shall we?";

        return (
            <ThemeProvider theme={theme.style}>
                <GlobalStyles />
                <div className={`mainIndex ${theme.theme}`}>
                    <Header
                        homeNav={ifInBucket}
                        headerText={`${ifInBucket ?
                            currentBucket.name : 'Hello, Human!'}`}
                        subHeaderText={subHeaderText} />
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route path='/bucket/:endpoint' component={Bucket} />
                    </Switch>
                </div>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    const taskStore = state.task;
    const globalStore = state.global;
    return {
        tasks: taskStore.tasks,
        currentBucket: globalStore.currentBucket,
        theme: globalStore.theme
    }
}

export default connect(mapStateToProps)(MainIndex);