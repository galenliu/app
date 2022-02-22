import Thing from './thing';

export default class Lock extends Thing {
    /**
     * Lock Constructor (extends Thing).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/lock.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.onProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'LockedProperty') {
                this.lockedProperty = name;
                break;
            }
        }

        // If necessary, match on name.
        if (this.lockedProperty === null && this.displayedProperties.hasOwnProperty('locked')) {
            this.lockedProperty = 'locked';
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

        if (name === this.lockedProperty) {
            this.icon.state = value;
        }
    }


}


