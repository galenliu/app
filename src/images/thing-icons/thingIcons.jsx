import Light from "./light";
import {Capability} from "../../js/constant";
import OnOffSwitch from "./on_off_switch";
import BinarySensor from "./binary_sensor";
import Box from "@mui/material/Box";
import * as React from 'react';
import MultiLevelSwitch from "./multi_level_switch";

export default function ThingIcons(props) {
    const selected = props.selected ? props.selected : "Light";
    return (
        <Box>
            {selected === Capability.Light && <Light {...props}/>}
            {selected === Capability.OnOffSwitch && <OnOffSwitch {...props}/>}
            {selected === Capability.BinarySensor && <BinarySensor {...props}/>}
            {selected === Capability.MultiLevelSwitch && <MultiLevelSwitch {...props}/>}
        </Box>
    )
}



