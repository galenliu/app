import {Button} from "@mui/material";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import {useEffect, useState} from "react";
import useLight from "../../hooks/use-light";
import ColorProperty from "../property/ColorProperty";
import BrightnessProperty from "../property/BrightnessProperty";


export default function Light(props) {

    const {
        onProperty,
        brightnessProperty,
        colorProperty,
        colorTemperatureProperty,
        colorModeProperty
    } = useLight(props.thing)


    useEffect(() => {
        console.log("light panel data:", props.thing)
    }, [])


    return (
        <List spacing={2} sx={{borderRadius: "3px"}}>
            {onProperty.property &&
                <OnOffProperty property={onProperty}/>}
            {brightnessProperty.property &&
                <BrightnessProperty property={brightnessProperty}/>}
            {colorProperty.property &&
                <ColorProperty property={colorProperty}/>}
        </List>
    )

}