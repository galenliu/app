import OnOffSwitch from './on-off-switch';

export default class SmartPlug extends OnOffSwitch {
    /**
     * SmartPlug Constructor (extends OnOffSwitch).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/smart_plug.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        super.findProperties();

        this.powerProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'InstantaneousPowerProperty') {
                this.powerProperty = name;
                break;
            }
        }

        // If necessary, match on name.
        if (
            this.powerProperty === null &&
            this.displayedProperties.hasOwnProperty('instantaneousPower')
        ) {
            this.powerProperty = 'instantaneousPower';
        }

        this.precision = 0;
        this.unit = 'watt';

        if (this.powerProperty) {
            const property = this.displayedProperties[this.powerProperty].convertedProperty;

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

        if (name === this.powerProperty) {
            value = parseFloat(value);
            this.icon.power = value;
        }
    }


}


