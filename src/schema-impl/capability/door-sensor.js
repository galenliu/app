import Thing from './thing';

export default class DoorSensor extends Thing {
    /**
     * DoorSensor Constructor (extends Thing).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/door_sensor.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.openProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'OpenProperty') {
                this.openProperty = name;
                break;
            }
        }

        // If necessary, match on name.
        if (this.openProperty === null && this.displayedProperties.open) {
            this.openProperty = 'open';
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

        if (name === this.openProperty) {
            this.icon.open = !!value;
        }
    }


}

