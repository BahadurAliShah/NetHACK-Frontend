import {startSniffing, stopSniffing} from "../ActionTypes/actionTypes";

export const startSniffingAction = (interfaceName, socket) => {
    return {
        type: startSniffing,
        interface: interfaceName,
        socket: socket
    }
}

export const stopSniffingAction = () => {
    return {
        type: stopSniffing
    }
}
