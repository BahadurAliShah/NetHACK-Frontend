import {addFilters, editFilters, clearFilters} from "../ActionTypes/actionTypes";

const initialState = [
    {
        id: 'aProtocol',
        name: 'Application Protocol',
        type: 'checkbox',
        options: [
            {value: 'dns', label: 'DNS', checked: false},
            {value: 'http', label: 'HTTP', checked: false},
            {value: 'ftp', label: 'FTP', checked: false},
            {value: 'smtp', label: 'SMTP', checked: false},
            {value: 'ssh', label: 'SSH', checked: false},
            {value: 'arp', label: 'ARP', checked: false},
            {value: 'telnet', label: 'TELNET', checked: false}
        ]
    },
    {
        id: "tProtocol",
        name: "Transport Protocols",
        type: 'checkbox',
        options: [
            {value: 'tcp', label: 'TCP', checked: false},
            {value: 'udp', label: 'UDP', checked: false},
            {value: 'icmp', label: 'ICMP', checked: false}
        ]
    },
    {
        id: 'host',
        name: "HOST",
        type: "text",
        options: [
            {value: "sourceip", label: 'SourceIP', inputValue: "", checked: false, placeholder: "192.168.0.1"},
            {
                value: "destinationip",
                label: 'DestinationIP',
                inputValue: "",
                checked: false,
                placeholder: "192.168.0.1"
            },
            {value: "sourceport", label: "Source Port", inputValue: "", checked: false, placeholder: "80"},
            {
                value: "destinationport",
                label: "Destination Port",
                inputValue: "",
                checked: false,
                placeholder: "420"
            },
            {
                value: "sourceaddress",
                label: "Source Address",
                inputValue: "",
                checked: false,
                placeholder: "ff:ff:ff:ff:ff"
            },
            {
                value: "destinationaddress",
                label: "Destination Address",
                inputValue: "",
                checked: false,
                placeholder: "ff:ff:ff:ff:ff"
            },
        ]
    }
];

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case addFilters:
            return [...action.filters];
        case editFilters:
            return [...action.filters];
        case clearFilters:
            return initialState.map(item => {
                return {
                    ...item, options: item.options.map(option => {
                        return {...option, checked: false}
                    })
                }
            })
        default:
            return state;
    }
}
