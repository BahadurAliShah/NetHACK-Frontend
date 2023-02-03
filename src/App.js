import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import Interfaces from './Pages/interfaces';
import NotFound from './Pages/notFound';
import Sidebar from "./Components/sidebar";
import Packets from "./Pages/packets";
import Speed from "./Pages/speed";
import Analyzer from "./Pages/analyzer";
import Import from "./Pages/import";
import Export from "./Pages/export";
import Topology from "./Pages/topology";

export default function App() {
    return (
        <React.StrictMode>
            <Router>
                <Sidebar/>
                <div className="sm:ml-64">
                    <Routes>
                        <Route path="/" element={<Interfaces/>}/>
                        <Route path={"/interfaces"} element={<Interfaces/>}/>
                        <Route path={"/packets"} element={<Packets/>}/>
                        <Route path={"/speed"} element={<Speed/>}/>
                        <Route path={"/topology"} element={<Topology/>}/>
                        <Route path={"/analyzer"} element={<Analyzer/>}/>
                        <Route path={"/import"} element={<Import/>}/>
                        <Route path={"/export"} element={<Export/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
        </React.StrictMode>
    );
}
