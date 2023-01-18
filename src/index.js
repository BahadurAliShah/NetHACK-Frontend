import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/home';
import NotFound from './Pages/notFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
