import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataProvider';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/App.css';


ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <DataProvider>
            
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
            
                </DataProvider>
            </BrowserRouter>
        </SnackbarProvider>
    </React.StrictMode>, 
    document.getElementById('root'));
