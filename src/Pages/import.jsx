import React, {useState} from 'react';
import {BaseURL, getPackets} from "../constants/constants";
import Header from "../Components/header";
import {useSelector, useDispatch} from "react-redux";
import {
    setPacketsPageAction,
    addPacketAction,
    setAverageSpeedAction,
    setDevicesAction,
    setInstantaneousSpeedAction,
    setAnalyzedDataAction,
    clearPacketsAction,
    setTotalPacketsAction,
    addWarningAction,
    clearWarningsAction,
    setTotalWarningsAction,
    setWarningsPageAction
} from "../Store/Actions/packetsActions";
import socketIO from 'socket.io-client';

export default function Import() {
    const [file, setFile] = useState(null);
    const sniffer = useSelector(state => state.sniffer);
    const packets = useSelector(state => state.packets);

    const dispatch = useDispatch();

    const selectFile = (e) => {
        e.preventDefault();
        if (e.target.files.length > 0)
            if (e.target.files[0].name.split('.').pop() === 'pcap') {
                setFile(e.target.files[0]);
            } else
                alert('Please upload a pcap file');
    }

    const dropHandler = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files[0].name.split('.').pop() === 'pcap') {
                setFile(e.dataTransfer.files[0]);
            } else {
                alert('Please upload a pcap file');
            }
        }
    }

    const uploadFile = (e) => {
        e.preventDefault();
        if (sniffer.isSniffing === false) {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                fetch(BaseURL + '/upload', {
                    method: 'POST',
                    body: formData
                }).then(res => res.json())
                    .then(res => {
                            if (res.status === 'success') {
                                dispatch(clearPacketsAction());
                                const newSocket = new socketIO(BaseURL);
                                newSocket.emit('get_imported_data');
                                newSocket.on('imported_data', (res) => {
                                    console.log(res);
                                    dispatch(setPacketsPageAction(0));
                                    dispatch(setWarningsPageAction(0));
                                    dispatch(clearPacketsAction());
                                    dispatch(clearWarningsAction());
                                    dispatch(setTotalWarningsAction(res['Warnings'].length));
                                    dispatch(setDevicesAction(res['Devices']));
                                    dispatch(setTotalPacketsAction(res['TotalPackets']));
                                    dispatch(setAverageSpeedAction(res['AvgSpeed']));
                                    dispatch(setInstantaneousSpeedAction(res['InstantaneousSPEED']));
                                    dispatch(setAnalyzedDataAction(res['AnalyzedData']));
                                    dispatch(addWarningAction(res['Warnings'], 0));
                                    newSocket.disconnect();
                                    const url = BaseURL + getPackets;
                                    const body = {
                                        "page": 0,
                                        "size": packets.packetsPerPage
                                    };
                                    fetch(url,
                                        {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(body)
                                        }).then(
                                        response => {
                                            if (response.status === 200) {
                                                response.json().then(res => {
                                                    if (res.status === 'success') {
                                                        const newSocket = new socketIO(BaseURL);
                                                        newSocket.emit('get_pagination_packets');
                                                        newSocket.on('pagination_packets', (res) => {
                                                            console.log(res);
                                                            dispatch(clearPacketsAction());
                                                            dispatch(addPacketAction(res['PaginationPackets']), 0)
                                                            newSocket.disconnect();
                                                            alert('File uploaded successfully');
                                                            setFile(null);
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    );
                                });
                            }
                        }
                    );
            } else
                alert('Please select a file first');
        } else
            alert('Please stop sniffing first');
    }

    return (
        <div className="p-5">
            <div className="mb-12">
                <Header pageTitle={"Import File"}/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg h-96 w-3/4"
                     onDrop={(e) => {
                         dropHandler(e);
                     }
                     }

                     onDragOverCapture={
                         (e) => {
                             e.preventDefault();
                         }
                     }
                >
                    <svg className="text-indigo-500 w-24 m-auto mb-4" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                        <label>
                            <input className="text-sm cursor-pointer w-36 hidden" type="file" accept={".pcap"}
                                   onChange={(e) => {
                                       selectFile(e);
                                   }
                                   }/>
                            <div
                                className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select
                            </div>
                        </label>

                        <div
                            className="title text-indigo-500 uppercase">{file ? file.name : "or drop files here"}</div>
                    </div>
                </div>
                <button type="button"
                        className="mt-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={(e) => {
                            uploadFile(e);
                        }
                        }
                >
                    Upload
                </button>
            </div>
        </div>
    );
}
