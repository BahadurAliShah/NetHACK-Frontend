import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setPacketsPerPageAction} from "../Store/Actions/packetsActions";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const RowsPerPage = (props) => {
    const dispatch = useDispatch();
    const packets = useSelector(state => state.packets);

    const handleRowsPerPage = async (e) => {
        dispatch(setPacketsPerPageAction(e));
        await props.handleChange(packets.page)
    }

    const rowsPerPageOptions = [100, 200, 300, 400, 500];
    return (<>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Rows Per Page
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {rowsPerPageOptions.map((option, index) => (
                            <Menu.Item
                                key={"RowsPerPageOption" + option}>
                                {({ active }) => (
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

export default function Table(props) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">{props.title}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        {props.tableDetail}
                    </p>
                </div>
                {props.rowsPerPage &&
                    <RowsPerPage handleChange={props.handleChange} />
                }
            </div>
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        {props.header.map((title, index) => {
                            if (index === 0)
                                return <th key={"header" + title} scope="col"
                                           className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{title}</th>
                            else if (index < props.header.length - 1)
                                return <th key={"header" + title} scope="col"
                                           className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">{title}</th>
                            else
                                return <th key={"header" + title} scope="col"
                                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{title}</th>
                        })
                        }
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Select</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.map((plan, planIdx) => (
                        <tr key={planIdx}>
                            <td
                                className={classNames(
                                    planIdx === 0 ? '' : 'border-t border-transparent',
                                    'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                )}
                            >
                                <div className="font-medium text-gray-900">
                                    {plan[props.header[0].toLowerCase()]}
                                    {plan.isCurrent ?
                                        <span className="ml-1 text-indigo-600">(Current Interface)</span> : null}
                                </div>
                                <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                    {props.header.map((title, index) => {
                                        return index > 0 && index < (props.header.length - 1) ? <span
                                            key={"firstCloumn" + title + planIdx}>{plan[title.toLowerCase()]}. </span> : <></>
                                    })}
                                </div>
                                {planIdx !== 0 ?
                                    <div className="absolute right-0 left-6 -top-px h-px bg-gray-200"/> : null}
                            </td>
                            {props.header.map((title, index) => {
                                if (index > 0 && index < props.header.length - 1)
                                    return (
                                        <td key={"columns" + title + planIdx}
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                            )}
                                        >
                                            {plan[title.toLowerCase()]}
                                        </td>
                                    )
                                else
                                    return <></>
                            })}
                            <td
                                className={classNames(
                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                    'px-3 py-3.5 text-sm text-gray-500'
                                )}
                            >
                                <div>{plan[props.header[props.header.length - 1].toLowerCase()]}</div>
                            </td>
                            <td
                                className={classNames(
                                    planIdx === 0 ? '' : 'border-t border-transparent',
                                    'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                                )}
                            >
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                    disabled={plan.isCurrent}
                                    onClick={() => props.selectorFunction(planIdx)}
                                >
                                    {props.selectButtonText}<span
                                    className="sr-only">, {plan[props.header[0].toLowerCase()]}</span>
                                </button>
                                {planIdx !== 0 ?
                                    <div className="absolute right-6 left-0 -top-px h-px bg-gray-200"/> : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
