import { Tab, Tabs } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

const getGoku = () => {
    return axios.get("https://dragonball-api.com/api/characters/1");
}

const getVegeta = () => {
    return axios.get("https://dragonball-api.com/api/characters/2");
}

const Component1 = () => {
    const [goku, setGoku] = useState(null);

    const getApiData = async () => {
        try {
            const result = await getGoku();
            adaptGoku(result.data)
        } catch (e) {console.log(e)};
    }

    const adaptGoku = (data: any) => {
        setGoku(data.name)
    }

    useEffect(() => {
        getApiData()
    }, [])

    return <div style={{ color: '#00f' }}>{goku}</div>
}

const Component2 = () => {
    const [vegeta, setVegeta] = useState(null);

    const getApiData = async () => {
        try {
            const result = await getVegeta();
            adaptVegeta(result.data)
        } catch (e) {console.log(e)}
    }

    const adaptVegeta = (data: any) => {
        setVegeta(data.name)
    }

    useEffect(() => {
        getApiData()
    }, [])

    return <div style={{ color: '#f00' }}>{vegeta}</div>
}


const DashBoard = () => {
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

export default DashBoard;