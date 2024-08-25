import { Tab, Tabs } from "@mui/material"
import { useState } from "react"

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
        <div role="tabpanel"> {value === 0 ? <div>Value1</div> : <div>Value2</div>}</div>
    </div>)
}

export default DashBoard;