import {startSniffing, stopSniffing} from "../ActionTypes/actionTypes";

const initialState = {
    isSniffing: false,
    interface: null,
    buttonText: 'Start Capturing',
    socket: null
}

export const snifferReducer = (state = initialState, action) => {
    switch (action.type) {
        case startSniffing:
            return {...state, isSniffing: true, interface: action.interface, buttonText: 'Stop Capturing', socket: action.socket};
        case stopSniffing:
            return {...state, isSniffing: false, buttonText: 'Start Capturing', socket: null};
        default:
            return state;
    }
}
