import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import Interfaces from './Pages/interfaces';
import NotFound from './Pages/notFound';
import Sidebar from "./Components/sidebar";
import {SidebarLinks} from './constants/constants';

export default function App() {
    const [sidebarLinks, setSidebarLinks] = useState(SidebarLinks);
    return (
        <React.StrictMode>
            <Router>
                <Sidebar navigation={sidebarLinks} setNavigation={setSidebarLinks}/>
                <div className="ml-64">
                    <Routes>
                        <Route path="/" element={<Interfaces/>}/>
                        <Route path={"/interfaces"} element={<Interfaces/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
        </React.StrictMode>
    );
}
