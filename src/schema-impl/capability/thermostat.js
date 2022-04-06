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

        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.temperatureProperty = null;

        this.heatingCoolingProperty = null;
        this.thermostatModeProperty = null;

        this.heatingTargetTemperatureProperty = null;
        this.coolingTargetTemperatureProperty = null;


        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'TemperatureProperty') {
                this.temperatureProperty = name;
            } else if (type === 'HeatingCoolingProperty') {
                this.heatingCoolingProperty = name;
            } else if (type === 'ThermostatModeProperty') {
                this.thermostatModeProperty = name;
            } else if (type === 'HeatingCoolingProperty') {
                this.heatingCoolingProperty = name;
            }
        }


        // If necessary, match on name.
        if (
            this.thermostatModeProperty === null &&
            this.displayedProperties.hasOwnProperty('thermostatMode')
        ) {
            this.thermostatModeProperty = 'thermostatMode';
        }

        if (
            this.heatingTargetTemperatureProperty === null &&
            this.displayedProperties.hasOwnProperty('heatingTargetTemperature')
        ) {
            this.heatingTargetTemperatureProperty = 'heatingTargetTemperature';
        }

        if (
            this.coolingTargetTemperatureProperty === null &&
            this.displayedProperties.hasOwnProperty('coolingTargetTemperature')
        ) {
            this.coolingTargetTemperatureProperty = 'coolingTargetTemperature';
        }

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
    }
}

export default Thermostat;
