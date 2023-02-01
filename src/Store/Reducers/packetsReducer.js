import {
    addPacket,
    clearPackets,
    setPacketsPage,
    setDevices,
    setInstantaneousSpeed,
    setAverageSpeed
} from "../ActionTypes/actionTypes";

const initialState = {
    packets: [],
    page: 1,
    devices: [],
    instantaneousSpeed: [],
    averageSpeed: []
}

export const packetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case addPacket:
            return {...state, packets: [...state.packets, ...action.packets]};
        case clearPackets:
            return {...state, packets: []};
        case setPacketsPage:
            return {...state, page: action.page};
        case setDevices:
            return {...state, devices: action.devices};
        case setInstantaneousSpeed:
            return {...state, instantaneousSpeed: action.instantaneousSpeed};
        case setAverageSpeed:
            return {...state, averageSpeed: action.averageSpeed};
        default:
            return state;
    }
}
