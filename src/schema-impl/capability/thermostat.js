import Thing from './thing';

class Thermostat extends Thing {
    /**
     * Thermostat Constructor (extends Thing).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/thermostat.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.temperatureProperty = null;
        this.heatingCoolingProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'TemperatureProperty') {
                this.temperatureProperty = name;
            } else if (type === 'HeatingCoolingProperty') {
                this.heatingCoolingProperty = name;
            }
        }

        // If necessary, match on name.
        if (
            this.temperatureProperty === null &&
            this.displayedProperties.hasOwnProperty('temperature')
        ) {
            this.temperatureProperty = 'temperature';
        }

        if (
            this.heatingCoolingProperty === null &&
            this.displayedProperties.hasOwnProperty('heatingCooling')
        ) {
            this.heatingCoolingProperty = 'heatingCooling';
        }

        this.precision = 0;
        this.unit = 'degree celsius';

        if (this.temperatureProperty) {
            const property = this.displayedProperties[this.temperatureProperty].convertedProperty;

            if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
                this.precision = `${property.multipleOf}`.split('.')[1].length;
            }

            if (property.hasOwnProperty('unit')) {
                this.unit = property.unit;
            }
        } else {
            this.precision = 0;
        }
    }

    get icon() {
        return this.element.querySelector('webthing-thermostat-capability');
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

        if (name === this.temperatureProperty) {
            value = parseFloat(value);
            this.icon.temperature = value;
        } else if (name === this.heatingCoolingProperty) {
            this.icon.state = value;
        }
    }
}

export default Thermostat;
