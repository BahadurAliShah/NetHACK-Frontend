import {addFilters, editFilters, clearFilters} from "../ActionTypes/actionTypes";

export const addFiltersAction = (filters) => {
    return {
        type: addFilters,
        filters: filters
    }
}

export const editFiltersAction = (filters) => {
    return {
        type: editFilters,
        filters: filters
    }
}

export const clearFiltersAction = () => {
    return {
        type: clearFilters
    }
}
