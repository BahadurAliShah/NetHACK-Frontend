import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectMenuItemAction, selectSubMenuItemAction} from "../Store/Actions/sidebarMenuActions";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
    const navigation = useSelector(state => state.navigation);
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <div className="sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
                        <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <div className="flex flex-1 flex-col overflow-y-auto">
                            <nav className="flex-1 space-y-1 px-2 py-4">
                                {navigation.map((item) => (
                                    <>
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={(e) =>
                                                dispatch(selectMenuItemAction(item))
                                            }
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>

                                        {item.current && item.subNavigation && (
                                            <div className="mt-1 space-y-1">
                                                {item.subNavigation.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        onClick={(e) =>
                                                            dispatch(selectSubMenuItemAction(item, subItem))
                                                        }
                                                        className={classNames(
                                                            subItem.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'group flex items-center ml-3 px-2 py-2 text-xs font-medium rounded-md'
                                                        )}
                                                    >
                                                        <subItem.icon
                                                            className={classNames(
                                                                subItem.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                                'mr-3 flex-shrink-0 h-4 w-4'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
