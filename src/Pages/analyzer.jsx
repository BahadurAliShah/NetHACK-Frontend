import React, {useEffect} from "react";
import Header from "../Components/header";
import {useSelector} from "react-redux";
import {VictoryPie, VictoryAnimation, VictoryLabel} from "victory";
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

const PieChartCard = (props) => {
    const getData = (percent) => {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    };

    return (
        <div className="flex flex-1 flex-col p-8">
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <VictoryPie
                    standalone={false}
                    animate={{ duration: 1000 }}
                    width={400} height={400}
                    data={getData(((props.count/props.totalPackets)*100))}
                    innerRadius={120}
                    cornerRadius={25}
                    labels={() => null}
                    style={{
                        data: { fill: ({ datum }) => {
                                const color = datum.y < 75 ? "green" : "red";
                                return datum.x === 1 ? color : "transparent";
                            }
                        }
                    }}
                />
                <VictoryLabel
                    textAnchor="middle" verticalAnchor="middle"
                    x={200} y={200}
                    text={`${Math.round(props.count/props.totalPackets*100)}%`}
                    style={{ fontSize: 45 }}
                />
            </svg>
            <h3 className="mt-6 text-sm font-medium text-gray-900">{props.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{props.count}/{props.totalPackets}</dd>
            </dl>
        </div>
    )
}

export default function Analyzer() {
    const totalPackets = useSelector(state => state.packets.totalPacketsCount);
    const averageSpeed = useSelector(state => state.packets.averageSpeed);
    const analyzedData = useSelector((state) => state.packets.analyzedData);

    return (
        <div className="p-5">
            <div className="mb-12">
                <Header pageTitle={"Analysis Page"}/>
            </div>

            <ul role="list" className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2">
                {averageSpeed.map((device) => (
                    <li
                        key={device['IP Address']}
                        className="col-span-1 flex flex-col divide-y divide-gray-50 rounded-lg bg-gray-100 text-center shadow"
                    >
                        <PieChartCard name={device['Mac Address']} count={device.receivedPackets + device.sentPackets} totalPackets={totalPackets}/>
                    </li>
                ))}
                {analyzedData.map((data) => (
                    <li
                        key={data.name}
                        className="col-span-1 flex flex-col divide-y divide-gray-50 rounded-lg bg-gray-100 text-center shadow"
                    >
                        <PieChartCard name={data.name} count={data.count} totalPackets={totalPackets}/>
                    </li>
                ))}
            </ul>


        </div>
    );
}
