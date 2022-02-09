import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

ReactDOM.render(<SnackbarProvider maxSnack={3}><App /></SnackbarProvider>, document.getElementById('root'));
