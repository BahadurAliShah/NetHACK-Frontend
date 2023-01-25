import {createStore, combineReducers} from 'redux';
import {interfacesReducer} from "./Reducers/interfacesReducer";
import {sidebarMenuReducer} from "./Reducers/sidebarMenuReducer";

export const store = createStore(combineReducers({
    interfaces: interfacesReducer,
    navigation: sidebarMenuReducer
}));

