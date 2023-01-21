import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import Interfaces from './Pages/interfaces';
import NotFound from './Pages/notFound';
import Sidebar from "./Components/sidebar";
import {SidebarLinks} from './constants/constants';
import {store} from "./Store/store";
import {Provider} from "react-redux";
import Packets from "./Pages/packets";

export default function App() {
    const [sidebarLinks, setSidebarLinks] = useState(SidebarLinks);
    return (
        <Provider store={store}>
            <React.StrictMode>
                <Router>
                    <Sidebar navigation={sidebarLinks} setNavigation={setSidebarLinks}/>
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
        </Provider>
    );
}
