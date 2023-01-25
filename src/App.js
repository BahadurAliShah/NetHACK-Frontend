import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import Interfaces from './Pages/interfaces';
import NotFound from './Pages/notFound';
import Sidebar from "./Components/sidebar";
import Packets from "./Pages/packets";
import {useDispatch, useSelector} from "react-redux";
import {selectMenuItemAction, selectSubMenuItemAction} from "./Store/Actions/sidebarMenuActions";

export default function App() {
    return (
        <React.StrictMode>
            <Router>
                <Sidebar />
                <div className="ml-64">
                    <Routes>
                        <Route path="/" element={<Interfaces/>}/>
                        <Route path={"/interfaces"} element={<Interfaces/>}/>
                        <Route path={"/packets"} element={<Packets/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
        </React.StrictMode>
    );
}
