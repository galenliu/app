import {Button, Stack} from "@mui/material";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import LightIcon from "../../images/thing-icons/light"
import React, {useEffect} from "react";
import ColorProperty from "../property/ColorProperty";
import BrightnessProperty from "../property/BrightnessProperty";
import ThingCard from "../../views/Things/ThingCard";
import {useLight} from "../../js/capability/use-light";


export default function Light({description, showThingId}) {

    const {
        thing,
        onProperty,
        brightnessProperty,
        colorProperty,
        colorTemperatureProperty,
        colorModeProperty
    } = useLight(description)


    useEffect(() => {

    }, [])

    function reader() {

        return (
            <>
                {description.id === showThingId && <Stack spacing={1} sx={{borderRadius: "3px"}}>
                    {onProperty &&
                        <OnOffProperty property={onProperty}/>}
                    {brightnessProperty &&
                        <BrightnessProperty property={brightnessProperty}/>}
                    {colorProperty &&
                        <ColorProperty property={colorProperty}/>}
                </Stack>}
                {/*<ThingCard onProperty={onProperty} color= {[colorProperty.value ? [onProperty.value ? colorProperty.value : "#bfbfbf"] : [onProperty.value ? "#FF9502" : "#bfbfbf"]]}/>*/}
                <ThingCard thing={thing} onProperty={onProperty} icon={<LightIcon/>}/>
            </>
        )
    }

    return (
        <>
            {reader()}
        </>
    )
}

