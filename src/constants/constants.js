import {DocumentChartBarIcon, WifiIcon} from "@heroicons/react/24/outline";

export const BaseURL = "http://127.0.0.1:5000";

export const getInterfaces = "/interfaces";

export const SidebarLinks = [
    {name: 'Intefaces', href: '/interfaces', icon: WifiIcon, current: true},
    {name: 'Packets', href: '/packets', icon: DocumentChartBarIcon, current: false}
]
