import React, {useState, useEffect} from "react";
import Table from "../Components/table";
import {apiGet} from "../constants/api";
import {BaseURL, getInterfaces} from "../constants/constants";
import {useSelector, useDispatch} from "react-redux";
import {setInterfacesAction} from "../Store/Actions/interfacesActions";



export default function Interfaces() {
    const interfaces = useSelector(state => state.interfaces);
    const dispatch = useDispatch();
    const [header, setHeader] = useState(["Name", "Address", "MacAddress", "IP"]);

    const selectorFunction = newID => {
        const newInterfaces = interfaces.map(item => {
            (item.id === newID) ?
                item.isCurrent = true :
                item.isCurrent = false;
            return item;
        });
        dispatch(setInterfacesAction(newInterfaces));
    }

    useEffect( () => {
        if (interfaces.length === 0) {
            apiGet(BaseURL + getInterfaces, res => {
                const Interfaces = res.map((item, index) => {
                    return {
                        id: index,
                        name: item.Name,
                        address: item.Address,
                        macaddress: item.MacAddress,
                        ip: item.IP
                    }
                });
                dispatch(setInterfacesAction(Interfaces));
            }, error => {
                console.log("Error File Fetching Interfaces: ", error);
            });
        }
    }, []);

    return (
        <div className="p-5">
            <div className="md:flex md:items-center md:justify-between mb-12">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Interfaces
                    </h2>
                </div>
            </div>
            <Table title={"Interfaces"} tableDetail={"Please Select the interface you want to analyze."} data={interfaces}
                   header={header} selectorFunction={selectorFunction}/>
        </div>
    );
}
