import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import dataStore from './redux/store';
import { Provider } from 'react-redux';

//Styles
import './styles/common.css';

//Index file import
import MainIndex from './pages/MainIndex';

function App() {
  return (
    <Provider store={dataStore}>
      <Router>
        <div className="pageBody">
          <Route path='/' component={MainIndex} />
        </div>
      </Router>
    </Provider>
  );
}


export default App;
