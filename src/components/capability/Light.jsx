import {Button, Stack} from "@mui/material";
import OnOffProperty from "../property/OnOffProperty";
import List from "@mui/material/List";
import LightIcon from "src/static/images/thing-icons/light"
import React, {useContext, useEffect} from "react";
import ColorProperty from "../property/ColorProperty";
import BrightnessProperty from "../property/BrightnessProperty";
import ThingCard from "src/views/Things/ThingCard";
import {useLight} from "src/js/capability/use-light";
import {fontSize} from "@material-ui/system";
import LevelProperty from "../property/LevelProperty";
import {BootstrapDialog, BootstrapDialogTitle, ThingDialog} from "../../views/Dialog/ThingDialog";
import {AppContext} from "../../App";
import Typography from "@mui/material/Typography";
import ThingTitle from "../../static/images/thing-title";


export default function Light({description}) {

    const {showThingId, showThing} = useContext(AppContext)
    const {
        thing,
        state,
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
                {description.id === showThingId &&
                    <ThingDialog  thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                        {onProperty?.property &&
                            <OnOffProperty property={onProperty}/>}
                        {brightnessProperty?.property &&
                            <BrightnessProperty property={brightnessProperty}/>}
                        {colorProperty.property &&
                            <ColorProperty property={colorProperty}/>}
                    </ThingDialog>}
                {/*<ThingCard onProperty={onProperty} color= {[colorProperty.value ? [onProperty.value ? colorProperty.value : "#bfbfbf"] : [onProperty.value ? "#FF9502" : "#bfbfbf"]]}/>*/}
                <ThingCard thing={thing} onProperty={onProperty} icon={<LightIcon
                    sx={{fontSize: 45, color: onProperty.value ? "warning.main" : "grey.500"}}/>} state={state}/>
            </>
        )
    }

    return (
        <>
            {reader()}
        </>
    )
}

