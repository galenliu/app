import Thing from './thing';

export default  class HumiditySensor extends Thing {
    /**
     * HumiditySensor Constructor (extends Thing).
     *
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
        this.humidityProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'HumidityProperty') {
                this.humidityProperty = name;
                break;
            }
        }

        this.precision = 0;
        this.unit = '';

        if (this.humidityProperty) {
            const property = this.displayedProperties[this.humidityProperty].convertedProperty;

            if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
                this.precision = `${property.multipleOf}`.split('.')[1].length;
            }

            if (property.hasOwnProperty('unit')) {
                this.unit = property.unit;
            }
        }
    }

    get icon() {
        return this.element.querySelector('webthing-humidity-sensor-capability');
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

        if (name === this.humidityProperty) {
            value = parseFloat(value);
            this.icon.level = value;
        }
    }
}

