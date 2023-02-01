import {createStore, combineReducers} from 'redux';
import {interfacesReducer} from "./Reducers/interfacesReducer";
import {sidebarMenuReducer} from "./Reducers/sidebarMenuReducer";
import {filtersReducer} from "./Reducers/filtersReducer";
import {snifferReducer} from "./Reducers/snifferReducer";
import {packetsReducer} from "./Reducers/packetsReducer";

export const store = createStore(combineReducers({
    interfaces: interfacesReducer,
    navigation: sidebarMenuReducer,
    filters: filtersReducer,
    sniffer: snifferReducer,
    packets: packetsReducer
}));

