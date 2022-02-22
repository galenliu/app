import OnOffSwitch from './on-off-switch';


export default class MultiLevelSwitch extends OnOffSwitch {
    /**
     * MultiLevelSwitch Constructor (extends OnOffSwitch).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/multi_level_switch.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        super.findProperties();

        this.levelProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'LevelProperty') {
                this.levelProperty = name;
                break;
            }
        }

        // If necessary, match on name.
        if (this.levelProperty === null && this.displayedProperties.hasOwnProperty('level')) {
            this.levelProperty = 'level';
        }

        this.precision = 0;
        this.unit = '';
        this.minimum = 0;
        this.maximum = 100;

        if (this.levelProperty) {
            const property = this.displayedProperties[this.levelProperty].convertedProperty;

            if (property.hasOwnProperty('multipleOf') && `${property.multipleOf}`.includes('.')) {
                this.precision = `${property.multipleOf}`.split('.')[1].length;
            }

            if (property.hasOwnProperty('unit')) {
                this.unit = property.unit;
            }

            if (property.hasOwnProperty('minimum')) {
                this.minimum = property.minimum;
            }

            if (property.hasOwnProperty('maximum')) {
                this.maximum = property.maximum;
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

        if (name === this.levelProperty) {
            value = parseFloat(value);
            this.icon.level = value;
        }
    }

    handleClick() {
        // Only click to toggle if we have an on/off property
        if (this.onProperty) {
            super.handleClick();
        }
    }


}


