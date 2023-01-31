import React, {useEffect, useState} from "react";
import {VictoryArea, VictoryStack} from "victory";

const directory = [
    {
        id: 1,
        name: 'Leslie Abbott',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Hector Adams',
        role: 'VP, Marketing',
        imageUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Blake Alexander',
        role: 'Account Coordinator',
        imageUrl:
            'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Fabricio Andrews',
        role: 'Senior Art Director',
        imageUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];


const Speed = () => {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

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

    const [data, setData] = useState([
        {x: 0, y: null},
        {x: 1, y: null},
        {x: 2, y: null},
        {x: 3, y: null},
        {x: 4, y: null},
        {x: 5, y: null},
        {x: 6, y: null},
        {x: 7, y: null},
        {x: 8, y: null},
        {x: 9, y: null},
        {x: 10, y: null},
        {x: 11, y: null},
        {x: 12, y: null},
        {x: 13, y: null},
        {x: 14, y: null},
        {x: 15, y: null},
        {x: 16, y: null},
        {x: 17, y: null},
        {x: 18, y: null},
        {x: 19, y: null},
        {x: 20, y: null},
        {x: 21, y: null},
        {x: 22, y: null},
        {x: 23, y: null},
        {x: 24, y: null},
        {x: 25, y: null},
        {x: 26, y: null},
        {x: 27, y: null},
        {x: 28, y: null},
        {x: 29, y: null},
        {x: 30, y: null},
        {x: 31, y: null},
        {x: 32, y: null},
        {x: 33, y: null},
        {x: 34, y: null},
        {x: 35, y: null},
        {x: 36, y: null},
        {x: 37, y: null},
        {x: 38, y: null},
        {x: 39, y: null},
        {x: 40, y: null},
        {x: 41, y: null},
        {x: 42, y: null},
        {x: 43, y: null},
        {x: 44, y: null},
        {x: 45, y: null},
        {x: 46, y: null},
        {x: 47, y: null},
        {x: 48, y: null},
        {x: 49, y: null},
        {x: 50, y: null},
        {x: 51, y: null},
        {x: 52, y: null},
        {x: 53, y: null},
        {x: 54, y: null},
        {x: 55, y: null},
        {x: 56, y: null},
        {x: 57, y: null},
        {x: 58, y: null},
        {x: 59, y: null},
    ]);

    const addData = (data, newValue) => {
        let nullArray = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].y === null) {
                nullArray = i;
            }
        }
        if (nullArray !== false) {
            data[nullArray].y = newValue;
        } else {
            for (let i = 0; i < data.length; i++) {
                if (i === data.length - 1) {
                    data[i].y = newValue;
                } else {
                    data[i].y = data[i + 1].y;
                }
            }
        }
        return data;
    }
    const printData = (data) => {
        return data.map((item) => item.y === null ? 0 : item.y);
    }
    const printData2 = (data) => {
        return data.map((item) => item.y === null ? 0 : item.y + 5);
    }

    useEffect(() => {
        setInterval(() => {
            const newData = addData(data, Math.floor(Math.random() * 10));
            setData([...newData]);
        }, 10000);
        return () => clearInterval();
    }, [data]);


    useEffect(() => {
        const handleResize = () => {
            const container = document.querySelector('.victory-area-container');
            setDimensions({
                width: container.offsetWidth,
                height: container.offsetHeight
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="p-5 ">
            <div className="md:flex md:items-center md:justify-between mb-12">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Speed
                    </h2>
                </div>
            </div>

            <div className="flex flex-row">
                <nav className="h-full overflow-y-auto w-1/3 border-r-2 border-gray-200" aria-label="Directory">
                    <ul role="list" className="relative z-0 divide-y divide-gray-200">
                        {directory.map((person) => (
                            <li key={person.id} className="bg-white">
                                <div
                                    className="relative flex items-center space-x-3 pl-2 pr-6 py-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-indigo-200">
                                    <div className="flex-shrink-0">
                                        <div className="h-16 w-24 bg-gray-50 border-2 border-black overflow-hidden">
                                            <VictoryArea
                                                padding={{top: 1, bottom: 0, left: 0, right: 0}}
                                                data={printData(data)}
                                                style={{
                                                    data: {
                                                        fill: "rgb(0,22,255)",
                                                        stroke: "rgb(29,29,31)",
                                                        strokeWidth: 2,
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        fillOpacity: 0.1
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <a href="#" className="focus:outline-none">
                                            {/* Extend touch target to entire panel */}
                                            <span className="absolute inset-0" aria-hidden="true"/>
                                            <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                            <p className="truncate text-sm text-gray-500">{person.role}</p>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={"w-2/3"}>
                    <div className={"w-4/5 mx-auto"}>
                        <div className="mt-6 min-w-0 flex-1 block">
                            <h1 className="truncate text-2xl font-medium text-gray-900">Device</h1>
                        </div>
                        <div
                            className="victory-area-container h-64 bg-gray-50 border-2 border-black overflow-hidden">
                            <VictoryStack
                                width={dimensions.width}
                                height={dimensions.height}
                                padding={{top: 1, bottom: 0, left: 0, right: 0}}
                            >
                                <VictoryArea
                                    data={printData(data)}
                                    style={{
                                        data: {
                                            fill: "rgb(0,22,255)",
                                            stroke: "rgb(29,29,31)",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            fillOpacity: 0.1
                                        }
                                    }}
                                />
                                <VictoryArea
                                    data={printData2(data)} padding={{top: 1, bottom: 0, left: 0, right: 0}}
                                    style={{
                                        data: {
                                            fill: "rgb(255,0,0)",
                                            stroke: "rgb(29,29,31)",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            fillOpacity: 0.1
                                        }
                                    }}
                                />
                            </VictoryStack>
                        </div>
                        <div className={"text-sm flex flex-row justify-between"}>
                            <p>60 seconds</p>
                            <p>0</p>
                        </div>

                        <div className={"flex flex-row justify-between mt-6"}>

                            <div className={"ml-0 my-3"}>
                                <div
                                    className={"border-pink-500 text-gray-900 whitespace-nowrap py-1 px-2 border-l-2 border-dashed font-medium text-sm"}>
                                    <p className={"text-gray-700 font-small"}>Send</p>
                                    <p className={"text-gray-900 text-2xl"}>100 Kbps</p>
                                </div>

                                <div
                                    className={"border-pink-500 text-gray-900 whitespace-nowrap mt-2 py-1 px-2 border-l-2 font-medium text-sm"}>
                                    <p className={"text-gray-700 font-small"}>Receive</p>
                                    <p className={"text-gray-900 text-2xl"}>100 Kbps</p>
                                </div>
                            </div>

                            <div className={" ml-16 text-sm"}>
                                <div className={"flex flex-row"}>
                                    <p className={"text-gray-500"}>IPv6 Address:</p>&nbsp;&nbsp;
                                    <p>ffff:Fffff:FFFFF:FFF</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Speed;
