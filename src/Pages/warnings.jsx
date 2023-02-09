import React, {Fragment} from "react";
import Header from "../Components/header";
import {useDispatch, useSelector} from "react-redux";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {
    addWarningAction,
    clearWarningsAction, setPacketsPerPageAction,
    setWarningsPageAction,
    setWarningsPerPageAction
} from "../Store/Actions/packetsActions";
import Pagination from "../Components/pagination";
import {BaseURL, getWarnings} from "../constants/constants";
import socketIO from "socket.io-client";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const RowsPerPage = (props) => {
    const dispatch = useDispatch();
    const warningsPage = useSelector(state => state.packets.warningsPage);

    const handleRowsPerPage = async (e) => {
        dispatch(setWarningsPerPageAction(e));
        props.handleChange(warningsPage);
    }

    const rowsPerPageOptions = [100, 200, 300, 400, 500];
    return (<>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Rows Per Page
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {rowsPerPageOptions.map((option, index) => (
                                <Menu.Item
                                    key={"RowsPerPageOption" + option}>
                                    {({active}) => (
                                        <a
                                            onClick={() => handleRowsPerPage(option)}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            {option}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}


export default function Warnings() {
    const packets = useSelector(state => state.packets);
    const warningsPerPage = packets.warningsPerPage;
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        console.log("Page Changed to " + page, warningsPerPage);
        const url = BaseURL + getWarnings;
        const body = {
            "page": page,
            "size": warningsPerPage,
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
                            newSocket.emit('get_pagination_warnings');
                            newSocket.on('pagination_warnings', (res) => {
                                console.log(res);
                                dispatch(clearWarningsAction());
                                dispatch(addWarningAction(res['PaginationWarnings'], 0))
                                dispatch(setWarningsPageAction(page));
                                newSocket.disconnect();
                            });
                        } else {
                            console.log(res);
                        }
                    });
                } else {
                    console.log('error', response);
                }
            }
        );
    }

    return (
        <div className="p-5">
            <div className="mb-12">
                <Header pageTitle={"Network Warnings"}/>
            </div>

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Warnings List</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        This is a list of all the warnings that have been generated by the network.
                    </p>
                </div>
                <RowsPerPage handleChange={handlePageChange}/>
            </div>


            <div className="mt-10 w-full text-sm font-medium bg-white">
                <ol className={"list-decimal list-inside"}>
                    {packets.warnings.map((item, index) => {
                        return (
                            <li key={index}
                                className={"mb-2 border border-gray-700 rounded p-2 mb-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700"}>
                                {item.description}
                            </li>);
                    })}
                </ol>
            </div>

            <Pagination currentPage={packets.warningsPage} totalCount={packets.totalWarningsCount}
                        rowsPerPage={packets.warningsPerPage} currentLength={packets.warnings.length}
                        handlePageChange={handlePageChange}/>
        </div>
    );
}
