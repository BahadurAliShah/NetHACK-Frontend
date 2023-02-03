import {
    setPacketsPerPage,
    setTotalPackets,
    addPacket,
    clearPackets,
    setPacketsPage,
    setDevices,
    setInstantaneousSpeed,
    setAverageSpeed,
    setAnalyzedData
} from "../ActionTypes/actionTypes";

const initialState = {
    totalPacketsCount: 0,
    packetsPerPage: 200,
    packets: [],
    page: 0,
    devices: [],
    instantaneousSpeed: [],
    averageSpeed: [],
    analyzedData: []
}

const addData = (data, newValue) => {
    for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
            data[i] = {...data[i], y: newValue};
        } else {
            data[i] = {...data[i], y: data[i + 1].y};
        }
    }
    return [...data];
}

const SampleData = [
    {x: 0, y: null},
    {x: 1, y: null},
    {x: 2, y: null},
    {x: 3, y: null},
    {x: 4, y: null},
    {x: 5, y: null},
    {x: 6, y: null},
    {x: 7, y: null},
    {x: 8, y: null},
    {x: 9, y: null},
    {x: 10, y: null},
    {x: 11, y: null},
    {x: 12, y: null},
    {x: 13, y: null},
    {x: 14, y: null},
    {x: 15, y: null},
    {x: 16, y: null},
    {x: 17, y: null},
    {x: 18, y: null},
    {x: 19, y: null},
    {x: 20, y: null},
    {x: 21, y: null},
    {x: 22, y: null},
    {x: 23, y: null},
    {x: 24, y: null},
    {x: 25, y: null},
    {x: 26, y: null},
    {x: 27, y: null},
    {x: 28, y: null},
    {x: 29, y: null},
    {x: 30, y: null},
    {x: 31, y: null},
    {x: 32, y: null},
    {x: 33, y: null},
    {x: 34, y: null},
    {x: 35, y: null},
    {x: 36, y: null},
    {x: 37, y: null},
    {x: 38, y: null},
    {x: 39, y: null},
    {x: 40, y: null},
    {x: 41, y: null},
    {x: 42, y: null},
    {x: 43, y: null},
    {x: 44, y: null},
    {x: 45, y: null},
    {x: 46, y: null},
    {x: 47, y: null},
    {x: 48, y: null},
    {x: 49, y: null},
    {x: 50, y: null},
    {x: 51, y: null},
    {x: 52, y: null},
    {x: 53, y: null},
    {x: 54, y: null},
    {x: 55, y: null},
    {x: 56, y: null},
    {x: 57, y: null},
    {x: 58, y: null},
    {x: 59, y: null},
];

export const packetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case setPacketsPerPage:
            return {...state, packetsPerPage: action.packetsPerPage};
        case setTotalPackets:
            return {...state, totalPacketsCount: action.totalPackets};
        case addPacket:
            if (state.packets.length === state.packetsPerPage) {
                return state;
            }
            let temp = [...state.packets, ...action.packets];
            if (temp.length > state.packetsPerPage) {
                temp.splice(-1 * (temp.length - state.packetsPerPage), temp.length - state.packetsPerPage);
            }
            return {...state, packets: [...temp]};
        case clearPackets:
            return {...state, packets: []};
        case setPacketsPage:
            return {...state, page: action.page};
        case setDevices:
            return {
                ...state, devices: action.devices.map(device => {
                        return {
                            ...device,
                            selected: false
                        }
                    }
                )
            };
        case setInstantaneousSpeed:
            const newInstantaneousSpeed = state.devices.map((device, index) => {
                if (index >= state.instantaneousSpeed.length) {
                    return {
                        send: addData([...SampleData], action.instantaneousSpeed[index]['instantanouesSSpeed']),
                        receive: addData([...SampleData], action.instantaneousSpeed[index]['instantanouesRSpeed'])
                    }
                }
                return {
                    send: addData([...state.instantaneousSpeed[index]['send']], action.instantaneousSpeed[index]['instantanouesSSpeed']),
                    receive: addData([...state.instantaneousSpeed[index]['receive']], action.instantaneousSpeed[index]['instantanouesRSpeed'])
                }
            });
            return {...state, instantaneousSpeed: newInstantaneousSpeed};
        case setAverageSpeed:
            return {...state, averageSpeed: action.averageSpeed};
        case setAnalyzedData:
            return {...state, analyzedData: action.analyzedData};
        default:
            return state;
    }
}
