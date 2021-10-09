import OnOffSwitch from './on-off-switch';
import Constants from "../../js/constant";

export default class Light extends OnOffSwitch {
    /**
     * Light Constructor (extends OnOffSwitch).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(
            model,
            description,
        );
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
            } else if (this.colorTemperatureProperty === null &&
                type === 'ColorTemperatureProperty') {
                this.colorTemperatureProperty = name;
            } else if (this.colorModeProperty === null &&
                type === 'ColorModeProperty') {
                this.colorModeProperty = name;
            }
        }

        // If necessary, match on name.
        if (this.brightnessProperty === null &&
            this.displayedProperties.hasOwnProperty('level')) {
            this.brightnessProperty = 'level';
        }

        if (this.colorProperty === null &&
            this.displayedProperties.hasOwnProperty('color')) {
            this.colorProperty = 'color';
        }

        if (this.colorTemperatureProperty === null &&
            this.displayedProperties.hasOwnProperty('colorTemperature')) {
            this.colorTemperatureProperty = 'colorTemperature';
        }

        if (this.colorModeProperty === null &&
            this.displayedProperties.hasOwnProperty('colorMode')) {
            this.colorModeProperty = 'colorMode';
        }
    }


    /**
     * Update the display for the provided property.
     * @param {string} name - name of the property
     * @param {*} value - value of the property
     */
    updateProperty(name, value) {

        value = super.updateProperty(name, value);
        if (!this.displayedProperties.hasOwnProperty(name)) {
            return;
        }
        if (name === this.brightnessProperty) {
            value = parseInt(value, 10);
            this.model.iconData.brightness = value;
            if (value > 0) {
                this.model.iconData.on = true
            }
            if (value === 0) {
                this.model.iconData.on = false
            }
        } else if (name === this.colorProperty) {
            this.model.iconData.color = value
        } else if (name === this.colorTemperatureProperty) {
            value = parseInt(value, 10);
            this.model.iconData.colorTemperature = value
        } else if (name === this.colorModeProperty) {
            this.model.iconData.colorMode = value;
        }
        this.model.handleEvent(Constants.ICON_STATUS, this.model.iconData)
    }

    handleClick() {
        super.handleClick()
    }

}


