import React from 'react';
import {useSelector} from "react-redux";
import {BaseURL} from "../constants/constants";
import Header from "../Components/header";

export default function Export() {
    const {sidebarMenu} = useSelector(state => state);
    const [file, setFile] = React.useState('');
    const downloadFile = () => {
        const url = BaseURL + '/download';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({file: file})
        }).then(res => {
            if (res.status === 200) {
                res.blob().then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file + '.pcap');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
            } else {
                alert('Error in Creating File');
            }
        });
    }

    return (
        <div className="p-5">
            <div className="mb-12">
                <Header pageTitle={"Export File"}/>
            </div>

            <div>
                <label htmlFor="filename" className="block text-sm font-medium text-gray-700">
                    Please Enter the filename
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="filename"
                        id="filename"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="abc"
                    />
                </div>

                <button type={"button"}
                        onClick={downloadFile}
                        className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Download
                </button>
            </div>
        </div>
    );
}
