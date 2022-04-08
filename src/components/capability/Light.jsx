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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ColorTemperatureProperty from "../property/ColorTemperatureProperty";


export default function Light({description}) {

    const {showThingId, showThing} = useContext(AppContext)
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
                {description.id === showThingId &&
                    <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                        {onProperty &&
                            <OnOffProperty property={onProperty}/>}
                        {brightnessProperty &&
                            <BrightnessProperty property={brightnessProperty}/>}
                        {colorProperty &&
                            <ColorProperty property={colorProperty}/>}
                        {colorTemperatureProperty &&
                            <ColorTemperatureProperty property={colorTemperatureProperty}/>}
                    </ThingDialog>}
                <ThingCard thing={thing} onProperty={onProperty} icon={<LightIcon
                    sx={{fontSize: 45, color: onProperty.value ? "warning.main" : "grey.500"}}/>}/>
                {/*<Box>*/}
                {/*    <Typography>{thing.id}</Typography>*/}
                {/*    <Divider/>*/}
                {/*    <Typography>{onProperty.title}</Typography>*/}
                {/*    <Divider/>*/}
                {/*    <Typography>{thing.onProperty}</Typography>*/}
                {/*    <Divider/>*/}
                {/*    <Typography>{thing.connected.toString()}</Typography>*/}
                {/*    <Divider/>*/}
                {/*    <Typography>{thing.state}</Typography>*/}
                {/*</Box>*/}
            </>
        )
    }

    return (
        <>
            {reader()}
        </>
    )
}

