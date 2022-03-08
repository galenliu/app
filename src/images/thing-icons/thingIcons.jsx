import Light from "./light";
import {ThingType} from "../../js/constant";
import OnOffSwitch from "./on_off_switch";
import BinarySensor from "./binary_sensor";
import Box from "@mui/material/Box";
import * as React from 'react';
import MultiLevelSwitch from "./multi_level_switch";

export default function ThingIcons(props) {
    const selected = props.selected ? props.selected : "Light";
    return (
        <Box>
            {selected === ThingType.Light && <Light {...props}/>}
            {selected === ThingType.OnOffSwitch && <OnOffSwitch {...props}/>}
            {selected === ThingType.BinarySensor && <BinarySensor {...props}/>}
            {selected === ThingType.MultiLevelSwitch && <MultiLevelSwitch {...props}/>}
        </Box>
    )
}
