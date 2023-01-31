import {createStore, combineReducers} from 'redux';
import {interfacesReducer} from "./Reducers/interfacesReducer";
import {sidebarMenuReducer} from "./Reducers/sidebarMenuReducer";
import {filtersReducer} from "./Reducers/filtersReducer";

export const store = createStore(combineReducers({
    interfaces: interfacesReducer,
    navigation: sidebarMenuReducer,
    filters: filtersReducer
}));

