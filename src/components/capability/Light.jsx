import {Button, Stack} from "@mui/material";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import LightIcon from "../../images/thing-icons/light"
import {useEffect, useState} from "react";
import ColorProperty from "../property/ColorProperty";
import BrightnessProperty from "../property/BrightnessProperty";
import useOnOffSwitch from "../../hooks/use-onOffSwitch";
import useProperty from "../../hooks/useProperty";
import ThingCard from "../../views/Things/ThingCard";


export default function Light({description, showThingId}) {

    const {
        onProperty,
        brightnessProperty,
        colorProperty,
        colorTemperatureProperty,
        colorModeProperty
    } = useLight(description)


    useEffect(() => {
        console.log("light panel data:",description )
    }, [])

    function reader() {

        return (
            <>
            {description.id === showThingId && <Stack spacing={1} sx={{borderRadius: "3px"}}>
                {onProperty.property &&
                    <OnOffProperty property={onProperty}/>}
                {brightnessProperty.property &&
                    <BrightnessProperty property={brightnessProperty}/>}
                {colorProperty.property &&
                    <ColorProperty property={colorProperty}/>}
            </Stack>}
            {/*<ThingCard onProperty={onProperty} color= {[colorProperty.value ? [onProperty.value ? colorProperty.value : "#bfbfbf"] : [onProperty.value ? "#FF9502" : "#bfbfbf"]]}/>*/}
            <ThingCard onPorperty={onProperty} icon={<LightIcon/>}/>
        </>
        )
    }

    return (
        <>
            {reader()}
        </>
    )
}

export function useLight({description}) {

    const {thing,onProperty} = useOnOffSwitch(description={description})
    const brightnessProperty = useProperty(thing, thing?.brightnessProperty)
    const colorProperty = useProperty(thing, thing?.colorProperty)
    const colorTemperatureProperty = useProperty(thing, thing?.colorTemperatureProperty)
    const colorModeProperty = useProperty(thing, thing?.colorModeProperty)

    return {thing,onProperty, brightnessProperty, colorProperty, colorTemperatureProperty, colorModeProperty}
}