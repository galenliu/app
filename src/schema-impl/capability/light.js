import OnOffSwitch from './on-off-switch';

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
        this.color = ""
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


        console.log("Light Model Update name:", name, "value:", value)
        if (!this.displayedProperties.hasOwnProperty(name)) {
            return;
        }
        if (name === this.brightnessProperty) {
            value = parseInt(value, 10);
            this.icon.brightness = value;
        } else if (name === this.colorProperty) {
            this.icon.color = value
        } else if (name === this.colorTemperatureProperty) {
            value = parseInt(value, 10);
            this.icon.colorTemperature = value;
        } else if (name === this.colorModeProperty) {
            this.icon.colorMode = value;
        }
    }

    handleClick() {
        super.handleClick()
    }

}


