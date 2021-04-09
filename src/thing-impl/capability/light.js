import OnOffSwitch from "./on-off-switch";
import {useEffect, useState} from "react";
import Constants from "../../js/constant";

function useDisplayProperties(description) {

    let properties = {
        brightnessProperty: null,
        colorProperty: null,
        colorTemperatureProperty: null,
        colorModeProperty: null
    }
    for (const name in description.displayedProperties) {
        const type = description.displayedProperties[name].property['@type'];
        if (description.brightnessProperty === null && type === 'BrightnessProperty') {
            properties.brightnessProperty = name;
        } else if (description.colorProperty === null && type === 'ColorProperty') {
            properties.colorProperty = name;
        } else if (description.colorTemperatureProperty === null &&
            type === 'ColorTemperatureProperty') {
            properties.colorTemperatureProperty = name;
        } else if (description.colorModeProperty === null &&
            type === 'ColorModeProperty') {
            properties.colorModeProperty = name;
        }
    }

    if (properties.brightnessProperty === null &&
        description.displayedProperties.hasOwnProperty('level')) {
        properties.brightnessProperty = 'level';
    }

    if (properties.colorProperty === null &&
        description.displayedProperties.hasOwnProperty('color')) {
        properties.colorProperty = 'color';
    }

    if (properties.colorTemperatureProperty === null &&
        description.displayedProperties.hasOwnProperty('colorTemperature')) {
        properties.colorTemperatureProperty = 'colorTemperature';
    }

    if (properties.colorModeProperty === null &&
        description.displayedProperties.hasOwnProperty('colorMode')) {
        properties.colorModeProperty = 'colorMode';
    }

    return properties
}


export default function Light(thingModel, description) {

    const [displayProperties] = useDisplayProperties(description)




    // findProperties() {
    //     super.findProperties();
    //
    //     this.brightnessProperty = null;
    //     this.colorProperty = null;
    //     this.colorTemperatureProperty = null;
    //     this.colorModeProperty = null;
    //
    //     // Look for displayProperties by type first.
    //     for (const name in this.displayedProperties) {
    //         const type = this.displayedProperties[name].property['@type'];
    //
    //         if (this.brightnessProperty === null && type === 'BrightnessProperty') {
    //             this.brightnessProperty = name;
    //         } else if (this.colorProperty === null && type === 'ColorProperty') {
    //             this.colorProperty = name;
    //         } else if (this.colorTemperatureProperty === null &&
    //             type === 'ColorTemperatureProperty') {
    //             this.colorTemperatureProperty = name;
    //         } else if (this.colorModeProperty === null &&
    //             type === 'ColorModeProperty') {
    //             this.colorModeProperty = name;
    //         }
    //     }
    //
    //     // If necessary, match on name.
    //     if (this.brightnessProperty === null &&
    //         this.displayedProperties.hasOwnProperty('level')) {
    //         this.brightnessProperty = 'level';
    //     }
    //
    //     if (this.colorProperty === null &&
    //         this.displayedProperties.hasOwnProperty('color')) {
    //         this.colorProperty = 'color';
    //     }
    //
    //     if (this.colorTemperatureProperty === null &&
    //         this.displayedProperties.hasOwnProperty('colorTemperature')) {
    //         this.colorTemperatureProperty = 'colorTemperature';
    //     }
    //
    //     if (this.colorModeProperty === null &&
    //         this.displayedProperties.hasOwnProperty('colorMode')) {
    //         this.colorModeProperty = 'colorMode';
    //     }
    // }


    // updateProperty(name, value) {
    //     value = super.updateProperty(name, value);
    //     console.log("Light Model Update name:", name, "value:", value)
    //     if (!this.displayedProperties.hasOwnProperty(name)) {
    //         return;
    //     }
    //     if (name === this.brightnessProperty) {
    //         value = parseInt(value, 10);
    //         this.icon.brightness = value;
    //     } else if (name === this.colorProperty) {
    //         this.icon.color = value
    //     } else if (name === this.colorTemperatureProperty) {
    //         value = parseInt(value, 10);
    //         this.icon.colorTemperature = value;
    //     } else if (name === this.colorModeProperty) {
    //         this.icon.colorMode = value;
    //     }
    // }

    function handleClick() {

    }

    return (
        <>
            <OnOffSwitch thingModel={thingModel} description={description} properties={properties}/>
        </>
    )
}


