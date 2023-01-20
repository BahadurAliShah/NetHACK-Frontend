import {setInterfaces} from "../ActionTypes/actionTypes";

export const setInterfacesAction = (interfaces) => {
    return {
        type: setInterfaces,
        interfaces: interfaces
    }
}
