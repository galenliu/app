import {useState} from "react";


export default function  useLight(prop){
    const brightnessProperty = useState(null);
    const colorProperty = useState(null);
    const colorTemperatureProperty = useState(null);
    const colorModeProperty = useState(null)

    function findProperties(){
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (this.brightnessProperty === null && type === 'BrightnessProperty') {
                this.brightnessProperty = name;
            } else if (this.colorProperty === null && type === 'ColorProperty') {
                this.colorProperty = name;
            } else if (this.colorTemperatureProperty === null && type === 'ColorTemperatureProperty') {
                this.colorTemperatureProperty = name;
            } else if (this.colorModeProperty === null && type === 'ColorModeProperty') {
                this.colorModeProperty = name;
            }
        }

        // If necessary, match on name.
        if (this.brightnessProperty === null && this.displayedProperties.hasOwnProperty('level')) {
            this.brightnessProperty = 'level';
        }

        if (this.colorProperty === null && this.displayedProperties.hasOwnProperty('color')) {
            this.colorProperty = 'color';
        }

        if (
            this.colorTemperatureProperty === null &&
            this.displayedProperties.hasOwnProperty('colorTemperature')
        ) {
            this.colorTemperatureProperty = 'colorTemperature';
        }

        if (this.colorModeProperty === null && this.displayedProperties.hasOwnProperty('colorMode')) {
            this.colorModeProperty = 'colorMode';
        }
    }
}