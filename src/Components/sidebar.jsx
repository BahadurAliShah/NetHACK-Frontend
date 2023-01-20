import React, {useEffect} from "react";
import { Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar(props) {
    useEffect(()=>console.log(props.navigation), [props.navigation])
    return (
        <>
            <div>
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
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
                                {props.navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={(e)=> {
                                                const updatedNavigation = props.navigation.map(uItem => {
                                                    (uItem.name === item.name) ? uItem.current = true : uItem.current = false;
                                                    return uItem;
                                                });
                                                props.setNavigation([...updatedNavigation]);
                                            }
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
                                    // <a
                                    //     key={item.name}
                                    //     href={item.href}
                                    //     // onClick={(e)=> {
                                    //     //         e.preventDefault();
                                    //     //         const updatedNavigation = props.navigation.map(uItem => {
                                    //     //             (uItem.name === item.name) ? uItem.current = true : uItem.current = false;
                                    //     //             return uItem;
                                    //     //         });
                                    //     //         props.setNavigation([...updatedNavigation]);
                                    //     //     }
                                    //     // }
                                    //     className={classNames(
                                    //         item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    //         'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    //     )}
                                    // >
                                    //     <item.icon
                                    //         className={classNames(
                                    //             item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                    //             'mr-3 flex-shrink-0 h-6 w-6'
                                    //         )}
                                    //         aria-hidden="true"
                                    //     />
                                    //     {item.name}
                                    // </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
