import React, {useEffect} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'


export default function Pagination(props) {
    const [paginationArray, setPaginationArray] = React.useState([]);
    useEffect(() => {
        let tempArray = [];
        for (let i = 0; i < Math.ceil(props.totalCount / props.rowsPerPage); i++) {
            tempArray.push(i);
        }
        setPaginationArray([...tempArray]);
    }, [props.totalCount, props.rowsPerPage]);

    return (
        <div className="mt-2 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={() => props.handlePageChange(props.currentPage - 1)}
                    className={props.currentPage > 1 ?
                        " cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                        "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    }
                >
                    Previous
                </a>
                <a
                    onClick={() => props.handlePageChange(props.currentPage + 1)}
                    className={props.currentPage < Math.ceil(props.totalCount / props.rowsPerPage) ?
                        " cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                        "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    }
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{props.rowsPerPage * props.currentPage}</span> to <span
                        className="font-medium">{props.rowsPerPage * props.currentPage + props.currentLength - 1}</span> of{' '}
                        <span className="font-medium">{props.totalCount}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            onClick={() => props.handlePageChange(props.currentPage - 1)}
                            className={props.currentPage > 0 ?
                                " cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
                                "pointer-events-none relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            }
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </a>
                        {props.currentPage >= 3 &&
                            <span
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
                        }
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        {paginationArray.map((page, index) => {
                            if (page > props.currentPage - 3 && page < props.currentPage + 3) {
                                return (
                                    <a
                                        onClick={() => props.handlePageChange(page)}
                                        aria-current="page"
                                        className={page === props.currentPage ? " cursor-pointer relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20" :
                                            " cursor-pointer relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"}
                                    >
                                        {page}
                                    </a>
                                );
                            }
                        })
                        }
                        {props.currentPage < Math.ceil(props.totalCount / props.rowsPerPage) - 3 &&
                            <span
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
                        }
                        <a
                            onClick={() => props.handlePageChange(props.currentPage + 1)}
                            className={props.currentPage < Math.ceil(props.totalCount / props.rowsPerPage) - 1 ?
                                " cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" :
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
