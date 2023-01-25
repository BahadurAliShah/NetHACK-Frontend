import {selectMenuItem, selectSubMenuItem} from '../ActionTypes/actionTypes';
import {DocumentChartBarIcon, FunnelIcon, WifiIcon} from "@heroicons/react/24/outline";

const initialState = [
    {name: 'Intefaces', href: '/interfaces', icon: WifiIcon, current: true},
    {name: 'Packets', href: '/packets', icon: DocumentChartBarIcon, current: false, subNavigation: [
            {name: 'Set Filters', icon: FunnelIcon}]}
]

export const sidebarMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case selectMenuItem:
            return state.map((item) => {
                if (item.name === action.menuItem.name) {
                    if (item.subNavigation) {
                        item.subNavigation = item.subNavigation.map((subItem) => {
                            subItem.current = false;
                            return subItem;
                        })
                        return {...item, current: true, subNavigation: item.subNavigation}
                    }
                    return {...item, current: true}
                } else {
                    if (item.subNavigation) {
                        item.subNavigation = item.subNavigation.map((subItem) => {
                            subItem.current = false;
                            return subItem;
                        })
                        return {...item, current: false, subNavigation: item.subNavigation}
                    }
                    return {...item, current: false}
                }
            });
        case selectSubMenuItem:
            return state.map((item) => {
                if (item.name === action.menuItem.name) {
                    return {...item, current: true, subNavigation: item.subNavigation.map((subItem) => {
                        if (subItem.name === action.subMenuItem.name) {
                            return {...subItem, current: !action.subMenuItem.current}
                        } else {
                            return {...subItem, current: false}
                        }
                    })}
                } else {
                    return {...item, current: false}
                }
            });
        default:
            return state;
    }
}
