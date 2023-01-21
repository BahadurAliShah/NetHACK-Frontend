import React from "react";
import Table from "../Components/table";


export default function Packets(props){

    const openPacket = (id) => {
        console.log("Open Packet: ", id);
    }

    const startSniffing = () => {
        console.log("Start Sniffing");
    }

    const packets = [
        {
            id: 0,
            host: "Packet 1",
            sourceip: "192.168.0.1",
            destinationip: "192.168.0.0",
            sourceport: "80",
            destinationport: "80",
            protocol: "TCP"
        }
    ];

    return (
        <div className="p-5">
            <div className="md:flex md:items-center md:justify-between mb-12">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Packets
                    </h2>
                </div>
            </div>
            <Table title={"Packets"} tableDetail={"List of the captured Packets."} data={packets} addButton={"Start Capture"} addButtonFunction={startSniffing}
                   header={["HOST","SourceIP", "DestinationIP", "Protocol", "SourcePort", "DestinationPort"]} selectorFunction={openPacket} selectButtonText={"Open"}/>
        </div>
    )
}
