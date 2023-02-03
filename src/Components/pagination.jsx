import React, {useEffect} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import {useDispatch, useSelector} from "react-redux";
import {addPacketAction, clearPacketsAction} from "../Store/Actions/packetsActions";
import {BaseURL, getPackets} from "../constants/constants";
import socketIO from 'socket.io-client';

export default function Pagination() {
    const dispatch = useDispatch();
    const packets = useSelector(state => state.packets);
    const [paginationArray, setPaginationArray] = React.useState([]);
    useEffect(() => {
        let tempArray = [];
        for (let i = 0; i < Math.ceil(packets.totalPacketsCount / packets.packetsPerPage); i++) {
            tempArray.push(i);
        }
        setPaginationArray([...tempArray]);
    }, [packets.totalPacketsCount, packets.packetsPerPage]);

    const handlePageChange = (page) => {
        const url = BaseURL + getPackets;
        const body = {
            "page": page,
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
                                dispatch(clearPacketsAction());
                                dispatch(addPacketAction(res['PaginationPackets'], 0))
                                newSocket.disconnect();
                            });
                        }
                    });
                }
            }
        );
    }

    return (
        <div className="mt-2 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={() => handlePageChange(packets.page - 1)}
                    className={packets.page > 1 ?
                        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                        "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    }
                >
                    Previous
                </a>
                <a
                    onClick={() => handlePageChange(packets.page + 1)}
                    className={packets.page < Math.ceil(packets.totalPacketsCount / packets.packetsPerPage) ?
                        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                        "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    }
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{packets.packetsPerPage * packets.page}</span> to <span
                        className="font-medium">{packets.packetsPerPage * packets.page + packets.packets.length - 1}</span> of{' '}
                        <span className="font-medium">{packets.totalPacketsCount}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            onClick={() => handlePageChange(packets.page - 1)}
                            className={packets.page > 0 ?
                                "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                                "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            }
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </a>
                        {packets.page >= 3 &&
                            <span
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
                        }
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        {paginationArray.map((page, index) => {
                            if (page > packets.page - 3 && page < packets.page + 3) {
                                return (
                                    <a
                                        onClick={() => handlePageChange(page)}
                                        aria-current="page"
                                        className={page === packets.page ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20" :
                                            "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"}
                                    >
                                        {page}
                                    </a>
                                );
                            }
                        })
                        }
                        {packets.page < Math.ceil(packets.totalPacketsCount / packets.packetsPerPage) - 3 &&
                            <span
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
                        }
                        <a
                            onClick={() => handlePageChange(packets.page + 1)}
                            className={packets.page < Math.ceil(packets.totalPacketsCount / packets.packetsPerPage) - 1 ?
                                "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                                "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            }
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
