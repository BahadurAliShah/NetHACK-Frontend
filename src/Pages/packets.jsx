import React, {useEffect, useRef, useState} from "react";
import Table from "../Components/table";
import {BaseURL} from "../constants/constants";
import socketIO from 'socket.io-client';
import {useSelector} from "react-redux";
import Modal from "../Components/modal";
import Tabs from "../Components/tabs";


export default function Packets(props) {
    const [sniffing, setSniffing] = useState(false);
    const interfaces = useSelector(state => state.interfaces);
    const [socket, setSocket] = useState(null);
    const [packets, setPackets] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedPacket, setSelectedPacket] = useState(null);
    const [tabs, setTabs] = useState([]);

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
                data = JSON.parse(data.data);
                // console.log("Packet: ", data);
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
            <div className="md:flex md:items-center md:justify-between mb-12">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Packets
                    </h2>
                </div>
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

            <Table title={"Packets"} tableDetail={"List of the captured Packets."} data={packets}
                   addButton={sniffing ? "Stop Capturing" : "Start Capturing"} addButtonFunction={startSniffing}
                   header={["HOST", "SourceIP", "DestinationIP", "Protocol", "SourcePort", "DestinationPort"]}
                   selectorFunction={openPacket} selectButtonText={"Open"}/>
        </div>
    )
}
