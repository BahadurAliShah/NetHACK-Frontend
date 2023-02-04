import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import {useSelector} from "react-redux";
import Header from "../Components/header";

function RelationGraph1() {
    const devices = useSelector(state => state.packets.devices);
    const nodes =  devices.map((device) => {
        return {
            id: device['Mac Address'],
            label: device['IP Address'],
            title: 'IP Address: ' + device['IP Address'] + ' Mac Address: ' + device['Mac Address'],
        }
    });
    const edges = devices.map((device) => {
        return {
            from: device['Mac Address'],
            to: device['Connected to'][0]
        }
    });
    const [graph, setGraph] = useState({
        nodes: nodes,
        edges: edges
    });

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#1D1D1D"
        },
        interaction: {
            hover: true,
            navigationButtons: true,
            tooltipDelay: 0
        },
        nodes: {
            borderWidth: 0,
            borderWidthSelected: 0,
            color: "#0262C4",
            shape: "circle",
            size: 1,
            shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.5)",
                size: 10,
                x: 5,
                y: 5
            },
            font: {
                color: "#fff",
                size: 13,
                bold: {
                    mod: "bold"
                }
            }
        }
    };


    return (
        <Graph
            graph={graph}
            options={options}
            style={{ height: "600px" }}
        />
    );
}

export default function Topology() {

    return (
        <div className="p-5">
            <div className="mb-12">
                <Header pageTitle={"Network Topology"}/>
            </div>
            <div>
                <RelationGraph1 />
            </div>
        </div>
    );
}
