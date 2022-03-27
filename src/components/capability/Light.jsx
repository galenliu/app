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
import {BootstrapDialog, BootstrapDialogTitle} from "../../views/Dialog/ThingDialog";
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
                    <BootstrapDialog
                        onClose={() => showThing("")}
                        aria-labelledby="customized-dialog-title"
                        open={description.id === showThingId}
                        sx={{}}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => showThing("")}>
                            <ThingTitle title={description.title}/>
                            <Typography variant="body2">
                                {description.group_id}
                            </Typography>
                        </BootstrapDialogTitle>
                        <Stack spacing={1} sx={{borderRadius: "3px", p: 1, width: 500}}>
                            {onProperty?.property &&
                                <OnOffProperty property={onProperty}/>}
                            {brightnessProperty?.property &&
                                <BrightnessProperty property={brightnessProperty}/>}
                            {colorProperty.property &&
                                <ColorProperty property={colorProperty}/>}
                        </Stack>
                    </BootstrapDialog>}
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

