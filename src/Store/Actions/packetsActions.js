import {addPacket, clearPackets, setPacketsPage, setDevices, setInstantaneousSpeed, setAverageSpeed} from "../ActionTypes/actionTypes";

export const addPacketAction = (packets) => {
    return {
        type: addPacket,
        packets: packets
    }
}

export const clearPacketsAction = () => {
    return {
        type: clearPackets
    }
}

export const setPacketsPageAction = (page) => {
    return {
        type: setPacketsPage,
        page: page
    }
}

export const setDevicesAction = (devices) => {
    return {
        type: setDevices,
        devices: devices
    }
}

export const setInstantaneousSpeedAction = (speed) => {
    return {
        type: setInstantaneousSpeed,
        instantaneousSpeed: speed
    }
}

export const setAverageSpeedAction = (speed) => {
    return {
        type: setAverageSpeed,
        averageSpeed: speed
    }
}
