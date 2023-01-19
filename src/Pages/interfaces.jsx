import React, {useState} from "react";
import Table from "../Components/table";

let temp = [
    {
        id: 1,
        name: 'Hobby',
        memory: '4 GB RAM',
        cpu: '4 CPUs',
        storage: '128 GB SSD disk',
        price: '$40',
        isCurrent: false,
    },
    {
        id: 2,
        name: 'Startup',
        memory: '8 GB RAM',
        cpu: '6 CPUs',
        storage: '256 GB SSD disk',
        price: '$80',
        isCurrent: false,
    },
    // More plans...
]

const header = [
    "Name", "Memory", "CPU", "Storage", "Price",
]

export default function Interfaces() {
    const [plans, setPlans] = useState(temp);

    const selectorFunction = newID => {
        const Newplans = plans.map(item => {
            (item.id == newID) ?
                item.isCurrent = true :
                item.isCurrent = false;
            return item;
        })
        setPlans([...Newplans]);
    }

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
