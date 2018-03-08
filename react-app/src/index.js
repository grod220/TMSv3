import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './sharedUtilities/registerServiceWorker';
import firebaseInit from './sharedUtilities/firebase';

firebaseInit();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
