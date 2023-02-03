import React, {useEffect, useState} from "react";
import {VictoryArea, VictoryGroup} from "victory";
import Header from "../Components/header";

const {useSelector} = require("react-redux");


const VictoryAreaChart = (props) => {
    return (<VictoryGroup
        width={props.width}
        height={props.height}
        padding={{top: 1, bottom: 0, left: 0, right: 0}}
        // maxDomain={{y: 10000}}
    >
        <VictoryArea
            data={props.data1}
            style={{
                data: {
                    fill: "rgb(47,255,0)",
                    stroke: "rgba(29,29,31,0.5)",
                    strokeWidth: 1,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fillOpacity: 0.3
                }
            }}
        />
        <VictoryArea
            data={props.data2} padding={{top: 0, bottom: 0, left: 0, right: 0}}
            style={{
                data: {
                    fill: "rgb(255,221,0)",
                    stroke: "rgba(29,29,31,0.5)",
                    strokeWidth: 1,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fillOpacity: 0.3
                }
            }}
        />
    </VictoryGroup>);
}


const Speed = () => {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    const devices = useSelector(state => state.packets.devices);
    const instantaneousSpeed = useSelector(state => state.packets.instantaneousSpeed);
    const averageSpeed = useSelector(state => state.packets.averageSpeed);

    const [selectedDevice, setSelectedDevice] = useState(0);

    const options = {
        scales: {
            x: {
                ticks: {
                    display: false
                }
            },
            y: {
                ticks: {
                    display: false
                }
            }
        }
    }

    const printData = (data) => {
        return data.map((item) => item.y === null ? 0 : item.y/10);
    }

    const handleResize = () => {
        if (devices.length > 0) {
            const container = document.querySelector('.victory-area-container');
            setDimensions({
                width: container.offsetWidth,
                height: container.offsetHeight
            });
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="p-5 ">
            <div className="mb-12">
                <Header pageTitle={"Speed Page"}/>
            </div>

            <div className="flex flex-row h-full">
                <div className="overflow-y-auto border-r-2 border-gray-200" style={{height: '535px'}}>
                    <nav className="" aria-label="Directory">
                        <ul role="list" className="relative z-0 divide-y divide-gray-200">
                            {devices.map((device, index) => (
                                <li key={device["Mac Address"] + "ListOfDevices"} className="bg-white"
                                    onClick={() => setSelectedDevice(index)}>
                                    <div
                                        className={selectedDevice == index ? "relative flex items-center space-x-3 pl-2 pr-6 py-2 ring-2 ring-inset ring-indigo-500 hover:bg-indigo-200" : "relative flex items-center space-x-3 pl-2 pr-6 py-2 hover:bg-indigo-200"}>
                                        <div className="flex-shrink-0">
                                            <div className="h-16 w-24 bg-gray-50 border-2 border-black overflow-hidden">
                                                <VictoryAreaChart data1={printData(instantaneousSpeed[index].send)}
                                                                  data2={printData(instantaneousSpeed[index].receive)}/>
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <a href="#" className="focus:outline-none">
                                                {/* Extend touch target to entire panel */}
                                                <span className="absolute inset-0" aria-hidden="true"/>
                                                <p className="text-sm font-medium text-gray-900">{device['Mac Address']}</p>
                                                <p className="truncate text-sm text-gray-500">{device['IP Address']}</p>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                {devices.length > 0 && (
                    <div className={"w-2/3"}>
                        <div className={"w-4/5 mx-auto"}>
                            <div className="mt-6 min-w-0 flex-1 block">
                                <h1 className="truncate text-2xl font-medium text-gray-900">Speed Graph</h1>
                            </div>
                            <div
                                className="victory-area-container h-64 bg-gray-50 border-2 border-black overflow-hidden">
                                <VictoryAreaChart data1={printData(instantaneousSpeed[selectedDevice].send)}
                                                  data2={printData(instantaneousSpeed[selectedDevice].receive)}
                                                  width={dimensions.width} height={dimensions.height}/>
                            </div>
                            <div className={"text-sm flex flex-row justify-between"}>
                                <p>60 seconds</p>
                                <p>0</p>
                            </div>

                            <div className={"flex flex-row justify-between mt-6"}>

                                <div className={"ml-0 my-3"}>
                                    <div
                                        className={"text-gray-900 whitespace-nowrap py-1 px-2 border-l-2 border-dashed font-medium text-sm"}
                                        style={{borderColor: "rgb(47,255,0)"}}>
                                        <p className={"text-gray-700 font-small"}>Send</p>
                                        <p className={"text-gray-900 text-2xl"}>{(instantaneousSpeed[selectedDevice].send[59].y / 1000).toFixed(3)} Kbps</p>
                                    </div>

                                    <div
                                        className={"text-gray-900 whitespace-nowrap mt-2 py-1 px-2 border-l-2 font-medium text-sm"}
                                        style={{borderColor: "rgb(255,221,0)"}}>
                                        <p className={"text-gray-700 font-small"}>Receive</p>
                                        <p className={"text-gray-900 text-2xl"}>{(instantaneousSpeed[selectedDevice].receive[59].y / 1000).toFixed(3)} Kbps</p>
                                    </div>
                                </div>

                                <div className={" ml-16 text-sm"}>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Mac Address:</p>&nbsp;&nbsp;
                                        <p>{devices[selectedDevice]['Mac Address']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>IP Address:</p>&nbsp;&nbsp;
                                        <p>{devices[selectedDevice]['IP Address']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Connected to:</p>&nbsp;&nbsp;
                                        <p>{devices[selectedDevice]['Connected to']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Sent Bytes:</p>&nbsp;&nbsp;
                                        <p>{averageSpeed[selectedDevice]['SBytes']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Received Bytes:</p>&nbsp;&nbsp;
                                        <p>{averageSpeed[selectedDevice]['RBytes']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Sent Packets:</p>&nbsp;&nbsp;
                                        <p>{averageSpeed[selectedDevice]['sentPackets']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Recieved Packets:</p>&nbsp;&nbsp;
                                        <p>{averageSpeed[selectedDevice]['receivedPackets']}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Average Upload Speed:</p>&nbsp;&nbsp;
                                        <p>{(averageSpeed[selectedDevice]['avgSSpeed'] / 1000).toFixed(3)}</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500"}>Average Download Speed:</p>&nbsp;&nbsp;
                                        <p>{(averageSpeed[selectedDevice]['avgRSpeed'] / 1000).toFixed(3)}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Speed;
