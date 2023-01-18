import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Interfaces from './Pages/interfaces';
import NotFound from './Pages/notFound';
import Sidebar from "./Components/sidebar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Sidebar/>
        <div className="ml-64">
            <Router>
                <Routes>
                    <Route path="/" element={<Interfaces/>}/>
                    <Route path={"/interfaces"} element={<Interfaces/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
