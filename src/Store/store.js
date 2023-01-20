import {createStore} from 'redux';
import {interfacesReducer} from "./Reducers/interfacesReducer";

export const store = createStore(interfacesReducer);

