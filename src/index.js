import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Interfaces from './Pages/interfaces';
import NotFound from './Pages/notFound';
import Sidebar from "./Components/sidebar";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
