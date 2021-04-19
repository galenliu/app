/**
 * On/Off Switch.
 */

'use strict';


import Thing from "./thing";

export default class OnOffSwitch extends Thing {
    /**
     * OnOffSwitch Constructor (extends Thing).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     * @param {Object} options Options for building the view.
     */
    constructor(model, description, format, options) {

        super(model, description, format, options);
        this.on = false
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.onProperty = null;
        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];
            if (type === 'OnOffProperty') {
                this.onProperty = name;
                break;
            }
        }
        // If necessary, match on name.
        if (this.onProperty === null && this.displayedProperties.hasOwnProperty('on')) {
            this.onProperty = 'on';
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

        if (name === this.onProperty) {
            this.on = value;
            if (value) {
                this.label = "on"
                console.log(" this.label = on")
            } else {
                this.label = "off"
                console.log(" this.label = off")
            }
        }
        return value;
    }

    /**
     * Handle a click on the on/off switch.
     */
    handleOnOff() {
        const newValue = !this.on
        this.model.setProperty(this.onProperty, newValue).catch((error) => {
            console.error(`Error trying to toggle switch: ${error}`);
        });
    }
}


