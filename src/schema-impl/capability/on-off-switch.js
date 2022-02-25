import Constants from '../../constants';
import Thing from './thing';

export default class OnOffSwitch extends Thing {
    /**
     * OnOffSwitch Constructor (extends Thing).
     *
     * @param model
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     * @param {Object} options Options for building the view.
     */
    constructor(model, description, format, options) {
        super(model, description, format, options);

    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {

        this.onProperty = null;
        // Look for properties by type first.
        for (let name in this.displayedProperties) {
            let type = this.displayedProperties[name].property['@type'];
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
            this.icon.on = !!value;
        }

        return value;
    }

    /**
     * Handle a click on the on/off switch.
     */
    handleClick(value) {
        this.model.setProperty(this.onProperty, value).catch((error) => {
            console.error(`Error trying to toggle switch: ${error}`);
        });
    }


}


