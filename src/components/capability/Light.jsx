import {Button, Stack} from "@mui/material";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import {useEffect, useState} from "react";
import ColorProperty from "../property/ColorProperty";
import BrightnessProperty from "../property/BrightnessProperty";
import useOnOffSwitch from "../../hooks/use-onOffSwitch";
import useProperty from "../../hooks/useProperty";


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
        <Stack spacing={1} sx={{borderRadius: "3px"}}>
            {onProperty.property &&
                <OnOffProperty property={onProperty}/>}
            {brightnessProperty.property &&
                <BrightnessProperty property={brightnessProperty}/>}
            {colorProperty.property &&
                <ColorProperty property={colorProperty}/>}
        </Stack>
    )

}

export  function useLight(thing) {

    const {onProperty} = useOnOffSwitch(thing)
    const brightnessProperty = useProperty(thing, thing.brightnessProperty)
    const colorProperty = useProperty(thing, thing.colorProperty)
    const colorTemperatureProperty = useProperty(thing, thing.colorTemperatureProperty)
    const colorModeProperty = useProperty(thing, thing.colorModeProperty)




    return {onProperty, brightnessProperty, colorProperty, colorTemperatureProperty, colorModeProperty}
}