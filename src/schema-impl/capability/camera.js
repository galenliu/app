import Thing from './thing';

export default class Camera extends Thing {
    /**
     * Camera Constructor (extends Thing).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/camera.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.imageProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (type === 'ImageProperty') {
                this.imageProperty = name;
                break;
            }
        }
    }

}
