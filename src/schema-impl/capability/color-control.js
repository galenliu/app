import Thing from './thing';


class ColorControl extends Thing {
    /**
     * ColorControl Constructor (extends Thing).
     *
     * @param model
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/color_control.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.colorProperty = null;
        this.colorTemperatureProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (this.colorProperty === null && type === 'ColorProperty') {
                this.colorProperty = name;
            } else if (this.colorTemperatureProperty === null && type === 'ColorTemperatureProperty') {
                this.colorTemperatureProperty = name;
            }
        }

        // If necessary, match on name.
        if (this.colorProperty === null && this.displayedProperties.hasOwnProperty('color')) {
            this.colorProperty = 'color';
        }

        if (
            this.colorTemperatureProperty === null &&
            this.displayedProperties.hasOwnProperty('colorTemperature')
        ) {
            this.colorTemperatureProperty = 'colorTemperature';
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

        if (name === this.colorProperty) {
            this.icon.color = value;
        } else if (name === this.colorTemperatureProperty) {
            value = parseInt(value, 10);
        }
    }


}

export default ColorControl;
