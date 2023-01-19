import React, {useState, useEffect} from "react";
import Table from "../Components/table";
import {apiGet} from "../constants/api";
import {BaseURL, getInterfaces} from "../constants/constants";


export default function Interfaces() {
    const [plans, setPlans] = useState([]);
    const [header, setHeader] = useState(["Name", "Address", "MacAddress", "IP"]);

    const selectorFunction = newID => {
        const Newplans = plans.map(item => {
            (item.id === newID) ?
                item.isCurrent = true :
                item.isCurrent = false;
            return item;
        })
        setPlans([...Newplans]);
    }

    useEffect( () => {
       apiGet(BaseURL+getInterfaces, res => {
           const Interfaces = res.map((item, index) => {
               return {
                   id: index,
                   name: item.Name,
                   address: item.Address,
                   macaddress: item.MacAddress,
                   ip: item.IP
               }
           });

           setPlans([...Interfaces]);
       }, error => {
           console.log("Error File Fetching Interfaces: ", error);
       });
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
            <Table title={"Interfaces"} tableDetail={"Please Select the interface you want to analyze."} data={plans}
                   header={header} selectorFunction={selectorFunction}/>
        </div>
    );
}
