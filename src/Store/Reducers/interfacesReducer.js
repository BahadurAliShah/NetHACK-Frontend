import {setInterfaces} from "../ActionTypes/actionTypes";

const initialState = {
    interfaces: []
};

export const interfacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case setInterfaces:
            return {
                ...state,
                interfaces: action.interfaces
            };
        default:
            return state;
    }
}
