import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {startSniffingAction, stopSniffingAction} from "../Store/Actions/snifferActions";
import {BaseURL} from "../constants/constants";
import socketIO from 'socket.io-client';
import {
    setTotalPacketsAction,
    addPacketAction,
    setAverageSpeedAction,
    setDevicesAction,
    setInstantaneousSpeedAction,
    setAnalyzedDataAction,
    clearPacketsAction, setPacketsPageAction
} from "../Store/Actions/packetsActions";


export default function Header(props) {
    const sniffer = useSelector(state => state.sniffer);
    const interfaces = useSelector(state => state.interfaces);
    const packets = useSelector(state => state.packets);
    // console.log(packets.packets.length);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sniffer.socket !== null) {
            sniffer.socket.on("packet", async (res) => {
                var data = JSON.parse(res.data);
                console.log(data);
                dispatch(setTotalPacketsAction(res['TotalPackets']));
                dispatch(addPacketAction(data, packets.packets.length));
                dispatch(setDevicesAction(res['Devices']));
                dispatch(setInstantaneousSpeedAction(res['InstantaneousSPEED']));
                dispatch(setAverageSpeedAction(res['AvgSpeed']));
                dispatch(setAnalyzedDataAction(res['AnalyzedData']));
            });
            sniffer.socket.on("disconnect", () => {
                console.log("Socket Disconnected");
                dispatch(stopSniffingAction());
            });
        }
    }, [sniffer.socket]);


    const handleSniffingAction = () => {
        if (sniffer.isSniffing == false) {
            const currentInterface = interfaces.filter(item => item.isCurrent === true);
            if (currentInterface.length === 0) {
                alert("Please Select an Interface First");
                return;
            }
            let continueSniffing = true;
            if (packets.totalPacketsCount > 0){
                // eslint-disable-next-line no-restricted-globals
                continueSniffing = confirm("Warning Previous Data Will Be Lost If You Start Sniffing. Please Save Your Data First");
            }
            if (continueSniffing) {
                const tempSocket = socketIO(BaseURL);
                tempSocket.on("connect", () => {
                    console.log("Socket Connected");
                    tempSocket.emit("start_sniffing", {"interface": currentInterface[0].name});
                });
                tempSocket.on("sniffing", (data) => {
                    console.log("Sniffing: ", data);
                    if (data["status"] === "success") {
                        dispatch(clearPacketsAction());
                        dispatch(setTotalPacketsAction(0));
                        dispatch(setDevicesAction([]));
                        dispatch(setInstantaneousSpeedAction([]));
                        dispatch(setAverageSpeedAction([]));
                        dispatch(setAnalyzedDataAction([]));
                        dispatch(setPacketsPageAction(0));
                        dispatch(startSniffingAction(data["interface"], tempSocket));
                    } else {
                        console.log("Error Sniffing: ", data["error"]);
                    }
                });
            }
        } else {
            sniffer.socket.emit("stop_sniffing");
            sniffer.socket.on("stoped_sniffing", (data) => {
                console.log("Stoped Sniffing: ", data);
                if (data["status"] === "success") {
                    sniffer.socket.disconnect();
                    dispatch(stopSniffingAction());
                } else {
                    console.log("Error Stoping Sniffing: ", data["error"]);
                }
            });
        }
    }

    return (
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">{props.pageTitle}</h3>
            <div className="mt-3 sm:mt-0 sm:ml-4">
                <button
                    type="button"
                    onClick={handleSniffingAction}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {sniffer.buttonText}
                </button>
            </div>
        </div>
    )
}
