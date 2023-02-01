import React, {useEffect, useState} from "react";
import Table from "../Components/table";
import {BaseURL} from "../constants/constants";
import socketIO from 'socket.io-client';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Components/modal";
import Tabs from "../Components/tabs";
import SlideOver from "../Components/slideOver";
import {selectSubMenuItemAction} from "../Store/Actions/sidebarMenuActions";
import {addFiltersAction, clearFiltersAction} from "../Store/Actions/filterActions";
import {Disclosure} from '@headlessui/react'
import {MinusIcon, PlusIcon} from '@heroicons/react/20/solid'
import Header from "../Components/header";

export default function Packets(props) {
    const [sniffing, setSniffing] = useState(false);
    const interfaces = useSelector(state => state.interfaces);
    const [socket, setSocket] = useState(null);
    const [packets, setPackets] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedPacket, setSelectedPacket] = useState(null);
    const [tabs, setTabs] = useState([]);
    const navigation = useSelector(state => state.navigation);
    const filters = useSelector(state => state.filters);
    const slider = navigation[1]['subNavigation'][0].current;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const setFilters = (filters) => {
        dispatch(addFiltersAction(filters));
    }

    const sendFilters = (clear) => {
        const newSocket = socketIO(BaseURL);
        console.log('Applying filters');
        if (clear) {
            dispatch(clearFiltersAction());
            newSocket.emit('clearFilters');
        } else
            newSocket.emit('setFilters', filters);

        setTimeout(() => {
            newSocket.disconnect();
        }, 1000);
    }

    const setSlider = (value) => {
        dispatch(selectSubMenuItemAction(navigation[1], navigation[1]['subNavigation'][0]));
    }

    var packetsList = [];
    const openPacket = (id) => {

        setTabs(packets[id].packet['Frame_info']['Frame_protocols'].map((item, index) => {
            return {
                name: item,
                href: '#',
                current: (index === 0),
            }
        }));
        setSelectedPacket(id);
        setModal(true);
    }

    useEffect(() => {
        if (socket !== null) {
            socket.on("connect", () => {
                console.log("Socket Connected");
            });
            socket.on("sniffing", (data) => {
                console.log("Sniffing: ", data);
                if (data["status"] === "success") {
                    setSniffing(true);
                } else {
                    setSniffing(false);
                    console.log("Error Sniffing: ", data["error"]);
                }
            });
            socket.on("packet", async (data) => {
                console.log("Packet: ", data);
                data = JSON.parse(data.data);
                var newPacket = [];
                data.forEach((item, index) => {
                    newPacket.push({
                        id: packets.length + index,
                        host: item['Ethernet']['src'],
                        sourceip: item['IP'] ? item['IP']['src'] : item['IPv6'] ? item['IPv6']['src'] : "Unknown",
                        destinationip: item['IP'] ? item['IP']['dst'] : item['IPv6'] ? item['IPv6']['dst'] : "Unknown",
                        sourceport: item['TCP'] ? item['TCP']['sport'] : item['UDP'] ? item['UDP']['sport'] : item['ICMP'] ? item['ICMP']['type'] : "N/A",
                        destinationport: item['TCP'] ? item['TCP']['dport'] : item['UDP'] ? item['UDP']['dport'] : item['ICMP'] ? item['ICMP']['type'] : "N/A",
                        protocol: item['Frame_info']['Frame_protocols'] && item['Frame_info']['Frame_protocols'][3],
                        packet: item
                    });
                });
                // console.log("New Packetaaaaaaaa: ", newPacket.length, packets.length);
                packetsList = packetsList.concat(newPacket);
                // console.log("New Packet Lenght: ", packets.length, packetsList.length);
                setPackets(packetsList);
            });
            socket.on("disconnect", () => {
                console.log("Socket Disconnected");
            });
        }
    }, [socket]);
    //
    // useEffect(() => {
    //     console.log("__________________________", packets);
    // }, [packets]);

    const startSniffing = () => {
        const currentInterface = interfaces.filter(item => item.isCurrent === true);
        if (currentInterface.length === 0) {
            alert("Please Select an Interface First");
            return;
        }
        if (sniffing) {
            socket.emit("stop_sniffing");
            setSniffing(false);
            socket.disconnect();
            setSocket(null);
        } else {
            const newSocket = socketIO(BaseURL);
            setSocket(newSocket);
            setSniffing(true);
            newSocket.emit("start_sniffing", {"interface": currentInterface[0].name});
        }
    }


    return (
        <div className="p-5">
            <div className="mb-12">
                <Header pageTitle={"Packets Page"}/>
            </div>
            <Modal open={modal} setOpen={setModal}>
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Tabs tabs={tabs} setTabs={setTabs}/>
                        <div className="mt-2">
                            {
                                tabs.map(item => {
                                    if (item.current) {
                                        return selectedPacket !== null && packets[selectedPacket] && Object.keys(packets[selectedPacket].packet[item.name]).map(key =>
                                            (
                                                <div className="flex flex-row indent-1 mr-5">
                                                    <div
                                                        className="text-sm text-gray-600 uppercase decoration-2 font-bold">
                                                        {key}
                                                    </div>
                                                    <div className="text-sm text-gray-500 ml-2 overflow-auto">
                                                        {packets[selectedPacket].packet[item.name][key]}
                                                    </div>
                                                </div>
                                            )
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setModal(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <SlideOver open={slider} setOpen={setSlider} title={"Filters"}>
                {filters.map((section, sectionIdx) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({open}) => (
                            <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button
                                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">{section.name}</span>
                                        <span className="ml-6 flex items-center">
                                  {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true"/>
                                  ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true"/>
                                  )}
                                </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                        {section.options.map((option, optionIdx) => (
                                            <div key={option.value} className="flex items-center">
                                                <input
                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    checked={option.checked}
                                                    onChange={(e) => {
                                                        let newFilters = [...filters];
                                                        newFilters[sectionIdx].options[optionIdx] = {
                                                            ...option,
                                                            checked: !option.checked
                                                        };
                                                        setFilters(newFilters);
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                >
                                                    {option.label}
                                                </label>
                                                {section.type === "text" && option.checked &&
                                                    <input type={section.type} value={option.inputValue}
                                                           placeholder={option.placeholder} onChange={(e) => {
                                                        let newFilters = [...filters];
                                                        newFilters[sectionIdx].options[optionIdx] = {
                                                            ...option,
                                                            inputValue: e.target.value
                                                        };
                                                        setFilters(newFilters);
                                                    }
                                                    }/>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
                <div className={"flex flex-row justify-between"}>
                    <button
                        type="button"
                        onClick={() => {
                            sendFilters(false);
                            setSlider(false);
                        }
                        }
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Apply Filters
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            sendFilters(true);
                            setSlider(false);
                        }}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Reset
                    </button>
                </div>
            </SlideOver>

            <Table title={"Packets"} tableDetail={"List of the captured Packets."} data={packets}
                   addButton={sniffing ? "Stop Capturing" : "Start Capturing"}
                   addButtonFunction={startSniffing}
                   header={["HOST", "SourceIP", "DestinationIP", "Protocol", "SourcePort", "DestinationPort"]}
                   selectorFunction={openPacket} selectButtonText={"Open"}/>
        </div>
    )
}
