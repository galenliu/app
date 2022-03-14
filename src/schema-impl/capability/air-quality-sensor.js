import Thing from './thing';


export default class AirQualitySensor extends Thing {
    /**
     * AirQualitySensor Constructor (extends Thing).
     *
     * @param model
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/multi_level_sensor.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.airQualityProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'ConcentrationProperty') {
                this.airQualityProperty = name;
                break;
            }

            if (type === 'DensityProperty') {
                this.airQualityProperty = name;
                break;
            }
        }

        this.precision = 0;
        this.unit = '';

        if (this.airQualityProperty) {
            const property = this.displayedProperties[this.airQualityProperty].convertedProperty;

            if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
                this.precision = `${property.multipleOf}`.split('.')[1].length;
            }

            if (property.hasOwnProperty('unit')) {
                this.unit = property.unit;
            }
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

        if (name === this.airQualityProperty) {
            value = parseFloat(value);
            this.icon.level = value;
        }
    }

}

