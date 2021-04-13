import React from "react";
import OnOffSwitch from "./on-off-switch";
import {useEffect, useState} from "react";

function getDisplayProperties(description) {

    let properties = {
        brightnessProperty: null,
        colorProperty: null,
        colorTemperatureProperty: null,
        colorModeProperty: null
    }
    for (const name in description.properties) {
        const type = description.properties[name]['@type'];
        if (properties.brightnessProperty === null && type === 'BrightnessProperty') {
            properties.brightnessProperty = name;
        } else if (properties.colorProperty === null && type === 'ColorProperty') {
            properties.colorProperty = name;
        } else if (properties.colorTemperatureProperty === null &&
            type === 'ColorTemperatureProperty') {
            properties.colorTemperatureProperty = name;
        } else if (properties.colorModeProperty === null &&
            type === 'ColorModeProperty') {
            properties.colorModeProperty = name;
        }
    }

    if (properties.brightnessProperty === null &&
        description.properties.hasOwnProperty('level')) {
        properties.brightnessProperty = 'level';
    }

    if (properties.colorProperty === null &&
        description.properties.hasOwnProperty('color')) {
        properties.colorProperty = 'color';
    }

    if (properties.colorTemperatureProperty === null &&
        description.properties.hasOwnProperty('colorTemperature')) {
        properties.colorTemperatureProperty = 'colorTemperature';
    }

    if (properties.colorModeProperty === null &&
        description.properties.hasOwnProperty('colorMode')) {
        properties.colorModeProperty = 'colorMode';
    }

    return properties
}



export function Light(thingModel, description) {


    console.log("Light Init thingModel:", thingModel, "\t\ndescription:", description)
    //
    // const [displayProperties, setDisplayProperties] = useState({})
    //
    // useEffect(() => {
    //     let dps = getDisplayProperties(description)
    //     if (dps !== null) {
    //         setDisplayProperties(dps)
    //     }
    //
    // }, [])

    // function dimmer(name, value) {
    //     if (displayProperties.brightnessProperty !== null) {
    //         thingModel.setProperty(name, value)
    //     }
    // }
    //
    // function color(name, value) {
    //     if (displayProperties.colorProperty !== null) {
    //         thingModel.setProperty(name, value)
    //     }
    // }
    //
    // function color_temp(name, value) {
    //     if (displayProperties.colorTemperatureProperty !== null) {
    //         thingModel.setProperty(name, value)
    //     }
    // }
    //
    // function handleClick() {
    //
    // }

    return (
        <>
            <OnOffSwitch thingModel={thingModel} description={description}  />
        </>
    )
}


