import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs(props) {
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={props.tabs.find((tab) => tab.current).name}
                    onChange={(e) => {
                        props.setTabs(props.tabs.map((tab) => {
                            tab.current = tab.name === e.target.value
                            return tab
                        }));
                    }
                    }
                >
                    {props.tabs.map((tab, index) => (
                        <option key={index}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {props.tabs.map((tab, index) => (
                            <a
                                key={index}
                                // href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.setTabs(props.tabs.map((t) => ({...t, current: t.name === tab.name})));
                                }
                                }
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
