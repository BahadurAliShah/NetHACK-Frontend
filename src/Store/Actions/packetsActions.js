import {
    setPacketsPerPage,
    setTotalPackets,
    addPacket,
    clearPackets,
    setPacketsPage,
    setDevices,
    setInstantaneousSpeed,
    setAverageSpeed,
    setAnalyzedData,
    setWarningsPerPage,
    setTotalWarnings,
    addWarning,
    clearWarnings,
    setWarningsPage
} from "../ActionTypes/actionTypes";

export const setPacketsPerPageAction = (noOfPackets) => {
    return {
        type: setPacketsPerPage,
        packetsPerPage: noOfPackets
    }
}

export const setTotalPacketsAction = (totalPackets) => {
    return {
        type: setTotalPackets,
        totalPackets: totalPackets
    }
}

export const addPacketAction = (packets, startIndex) => {
    let newPackets = [];
    packets.forEach((item, index) => {
        newPackets.push({
            id: startIndex + index,
            host: item['Ethernet']['src'],
            sourceip: item['IP'] ? item['IP']['src'] : item['IPv6'] ? item['IPv6']['src'] : "Unknown",
            destinationip: item['IP'] ? item['IP']['dst'] : item['IPv6'] ? item['IPv6']['dst'] : "Unknown",
            sourceport: item['TCP'] ? item['TCP']['sport'] : item['UDP'] ? item['UDP']['sport'] : item['ICMP'] ? item['ICMP']['type'] : "N/A",
            destinationport: item['TCP'] ? item['TCP']['dport'] : item['UDP'] ? item['UDP']['dport'] : item['ICMP'] ? item['ICMP']['type'] : "N/A",
            protocol: item['Frame_info']['Frame_protocols'] && item['Frame_info']['Frame_protocols'][3],
            packet: item
        });
    });
    return {
        type: addPacket,
        packets: newPackets
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

export const setAnalyzedDataAction = (data) => {
    return {
        type: setAnalyzedData,
        analyzedData: data
    }
}

export const setWarningsPerPageAction = (noOfWarnings) => {
    return {
        type: setWarningsPerPage,
        warningsPerPage: noOfWarnings
    }
}

export const setTotalWarningsAction = (totalWarnings) => {
    return {
        type: setTotalWarnings,
        totalWarnings: totalWarnings
    }
}

export const addWarningAction = (warnings, startIndex) => {
    let newWarnings = [];
    warnings.forEach((item, index) => {
        newWarnings.push({
            id: startIndex + index,
            description: item
        });
    });
    return {
        type: addWarning,
        warnings: newWarnings
    }
}

export const clearWarningsAction = () => {
    return {
        type: clearWarnings
    }
}

export const setWarningsPageAction = (page) => {
    return {
        type: setWarningsPage,
        page: page
    }
}
