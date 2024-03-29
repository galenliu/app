import OnOffSwitch from './on-off-switch';

import React from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default class Light extends OnOffSwitch {
    /**
     * Light Constructor (extends OnOffSwitch).
     *
     * @param model
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format)
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        super.findProperties();

        this.brightnessProperty = null;
        this.colorProperty = null;
        this.colorTemperatureProperty = null;
        this.colorModeProperty = null;

        // Look for properties by type first.
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


