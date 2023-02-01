import React, {useState, useEffect} from "react";
import Table from "../Components/table";
import {apiGet} from "../constants/api";
import {BaseURL, getInterfaces} from "../constants/constants";
import {useSelector, useDispatch} from "react-redux";
import {setInterfacesAction} from "../Store/Actions/interfacesActions";
import Header from "../Components/header";



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
            <div className="mb-12">
                <Header pageTitle={"Interfaces Page"}/>
            </div>

            <Table title={"Interfaces"} tableDetail={"Please Select the interface you want to analyze."} data={interfaces}
                   header={header} selectorFunction={selectorFunction} selectButtonText={"Select"}/>
        </div>
    );
}
