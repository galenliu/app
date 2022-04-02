import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {useContext, useEffect} from "react";
import {AppContext} from "../../App";
import {useLight} from "../../js/capability/use-light";
import {ThingDialog} from "../../views/Dialog/ThingDialog";
import OnOffProperty from "../property/OnOffProperty";
import BrightnessProperty from "../property/BrightnessProperty";
import ColorProperty from "../property/ColorProperty";
import ThingCard from "../../views/Things/ThingCard";
import LightIcon from "../../static/images/thing-icons/light";
import useOnOffSwitch from "../../js/capability/use-on-off-switch";
import useNumberProperty from "../../js/property/use-number-property";

export default function SmartPlug({description}) {

    const {showThingId, showThing} = useContext(AppContext)
    const {
        thing,
        onProperty,
    } = useOnOffSwitch(description)

    const levelProperty = useNumberProperty(thing, thing?.levelProperty)
    const powerProperty = useNumberProperty(thing,thing?.powerProperty)

    function reader() {

        return (
            <>
                {description.id === showThingId &&
                    <ThingDialog  thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                        {onProperty?.property &&
                            <OnOffProperty property={onProperty}/>}
                        {powerProperty?.property &&
                            <BrightnessProperty property={brightnessProperty}/>}
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