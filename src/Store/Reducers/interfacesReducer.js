import {setInterfaces} from "../ActionTypes/actionTypes";

const initialState = [];

export const interfacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case setInterfaces:
            return [...action.interfaces];
        default:
            return state;
    }
}
