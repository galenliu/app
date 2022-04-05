import * as React from 'react';
import {useTranslation} from "react-i18next";
import enTrans from "src/js/i18n/en-us.json"
import Box from "@mui/material/Box";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import {useLight} from "../../js/capability/use-light";
import {ThingDialog} from "../../views/Dialog/ThingDialog";
import OnOffProperty from "../property/OnOffProperty";
import BrightnessProperty from "../property/BrightnessProperty";
import ColorProperty from "../property/ColorProperty";
import ThingCard from "../../views/Things/ThingCard";
import LightIcon from "../../static/images/thing-icons/light";
import useThing from "../../js/capability/use-thing";
import ThingIcons from "../../static/images/thing-icons/thingIcons";
import {useThermostat} from "../../js/capability/use-thermostat";
import TargetTemperatureProperty from "../property/TargetTemperatureProperty";
import TemperatureProperty from "../property/TemperatureProperty";

export default function Thermostat({description}) {
    const {t} = useTranslation();
    const {showThingId, showThing} = useContext(AppContext)
    const {
        thing,
        state,
        temperatureProperty,
    } = useThermostat(description)




    function reader() {

        return (
            <>
                {description.id === showThingId &&
                    <ThingDialog thing={thing} open={description.id === showThingId} onClose={() => showThing("")}>
                        <TemperatureProperty property={temperatureProperty}/>
                        <TargetTemperatureProperty property={temperatureProperty}/>
                    </ThingDialog>}
                {/*<ThingCard onProperty={onProperty} color= {[colorProperty.value ? [onProperty.value ? colorProperty.value : "#bfbfbf"] : [onProperty.value ? "#FF9502" : "#bfbfbf"]]}/>*/}
                <ThingCard thing={thing} icon={<ThingIcons temperature={temperatureProperty.value} selected={description.selectedCapability}
                                                          sx={{fontSize: 45}}/>} state={state}/>
            </>
        )
    }

    return (
        <>
            {reader()}
        </>
    )
}

