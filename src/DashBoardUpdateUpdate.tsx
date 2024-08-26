import axios from "axios";
import useFetchAndLoad from "./useFetchAndLoad";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import useAsync from "./useAsync";

const loadAbort = () => {
    const controller = new AbortController();
    return controller;
}

const getGoku = () => {
    const controller = loadAbort();
    return { call: axios.get("https://dragonball-api.com/api/characters/1", { signal: controller.signal }), controller }; 
}

const getVegeta = () => {
    const controller = loadAbort();
    return { call: axios.get("https://dragonball-api.com/api/characters/2", {signal: controller.signal}), controller };
}

const Component1 = () => {
    const { loading, callEndpoint} = useFetchAndLoad(); 
    const [goku, setGoku] = useState(null);

    const getApiData = async () => await callEndpoint(getGoku());

    const adaptGoku = (data: any) => {
        setGoku(data.name)
    }

    useAsync(getApiData, adaptGoku, () => {console.log("Elemento1 Eliminado")}, [])

    return <div style={{ color: '#00f' }}>{loading ? 'LOADING' : goku}</div>
}

const Component2 = () => {
    const { loading , callEndpoint } = useFetchAndLoad();
    const [vegeta, setVegeta] = useState(null);

    const getApiData = async () => await callEndpoint(getVegeta())

    const adaptVegeta = (data: any) => {
        setVegeta(data.name)
    }

    useAsync(getApiData, adaptVegeta, () => {console.log("Elemento2 Eliminado")}, [])

    return <div style={{ color: '#f00' }}>{loading ? 'LOADING' : vegeta}</div>
}

const DashBoardUpdateUpdate = () => {
    const [value, setValue] = useState(0);
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    }

    return (<div>
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            <Tab label="Item One" {...a11yProps(0)}/>
            <Tab label="Item Two" {...a11yProps(1)}/>
        </Tabs>
        <div style={{ marginTop: '48px' }} role="tabpanel"> {value === 0 ? <Component1 /> : <Component2 />}</div>
    </div>)
}

export default DashBoardUpdateUpdate;