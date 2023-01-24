import React, {useState, useEffect} from "react";
import Table from "../Components/table";
import {BaseURL} from "../constants/constants";
import socketIO from 'socket.io-client';
import {useSelector} from "react-redux";
import {json} from "react-router";


export default function Packets(props){
    const [sniffing, setSniffing] = useState(false);
    const interfaces = useSelector(state => state.interfaces);
    const [socket, setSocket] = useState(null);
    const [packets, setPackets] = useState([]);
    var packetsList = [];
    const openPacket = (id) => {
        console.log("Open Packet: ", id);
    }

    useEffect (() => {
        if (socket !== null) {
            socket.on("connect", () => {
                console.log("Socket Connected");
            });
            socket.on("sniffing", (data) => {
                console.log("Sniffing: ", data);
                if (data["status"] === "success") {
                    setSniffing(true);
                }else {
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
                        host: item['layers']['Ethernet']['src'],
                        sourceip: item['layers']['IP'] ? item['layers']['IP']['src']: item['layers']['IPv6']? item['layers']['IPv6']['src']: "Unknown",
                        destinationip: item['layers']['IP'] ? item['layers']['IP']['dst']: item['layers']['IPv6']? item['layers']['IPv6']['dst']: "Unknown",
                        sourceport: item['layers']['TCP']? item['layers']['TCP']['sport']: item['layers']['UDP']? item['layers']['UDP']['sport']: item['layers']['ICMP']? item['layers']['ICMP']['type']: "N/A",
                        destinationport: item['layers']['TCP']? item['layers']['TCP']['dport']: item['layers']['UDP']? item['layers']['UDP']['dport']: item['layers']['ICMP']? item['layers']['ICMP']['type']: "N/A",
                        protocol: item['Frame_info']['Frame_protocols'][2],
                        full: item
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
        }
        else {
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
            <Table title={"Packets"} tableDetail={"List of the captured Packets."} data={packets} addButton={sniffing? "Stop Capturing": "Start Capturing"} addButtonFunction={startSniffing}
                   header={["HOST","SourceIP", "DestinationIP", "Protocol", "SourcePort", "DestinationPort"]} selectorFunction={openPacket} selectButtonText={"Open"}/>
        </div>
    )
}
