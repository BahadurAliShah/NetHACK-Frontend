import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
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
            </div>
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        {props.header.map((title, index) => {
                            if (index == 0)
                                return <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{title}</th>
                            else if (index < props.header.length-1)
                                return <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">{title}</th>
                            else
                                return <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{title}</th>
                            })
                        }
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Select</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.map((plan, planIdx) => (
                        <tr key={plan[props.header[0].toLowerCase()]}>
                            <td
                                className={classNames(
                                    planIdx === 0 ? '' : 'border-t border-transparent',
                                    'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                )}
                            >
                                <div className="font-medium text-gray-900">
                                    {plan.name}
                                    {plan.isCurrent ? <span className="ml-1 text-indigo-600">(Current Interface)</span> : null}
                                </div>
                                <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                    { props.header.map((title, index) => {
                                        return index > 0 && index < (props.header.length - 1) ?  <span>{plan[title.toLowerCase()]}. </span>: <></>
                                    })}
                                </div>
                                {planIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                            </td>
                            {props.header.map((title, index) => {
                                if (index > 0 && index < props.header.length-1)
                                    return (
                                    <td
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
                                <div>{plan[props.header[props.header.length-1].toLowerCase()]}</div>
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
                                    onClick={()=>props.selectorFunction(plan.id)}
                                >
                                    Select<span className="sr-only">, {plan[props.header[0].toLowerCase()]}</span>
                                </button>
                                {planIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
