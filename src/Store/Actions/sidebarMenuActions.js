import {selectMenuItem, selectSubMenuItem} from '../ActionTypes/actionTypes';

export const selectMenuItemAction = (menuItem) => {
    return {
        type: selectMenuItem,
        menuItem: menuItem
    }
}

export const selectSubMenuItemAction = (menuItem, subMenuItem) => {
    return {
        type: selectSubMenuItem,
        menuItem: menuItem,
        subMenuItem: subMenuItem
    }
}
