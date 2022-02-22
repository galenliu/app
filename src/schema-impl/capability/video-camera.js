import Thing from './thing';

export default  class VideoCamera extends Thing {
    /**
     * VideoCamera Constructor (extends Thing).
     *
     * @param {Object} description Thing description object.
     * @param {Number} format See Constants.ThingFormat
     */
    constructor(model, description, format) {
        super(model, description, format, {
            baseIcon: '/images/thing-icons/video_camera.svg',
        });
    }

    /**
     * Find any properties required for this view.
     */
    findProperties() {
        this.imageProperty = null;
        this.videoProperty = null;

        // Look for properties by type first.
        for (const name in this.displayedProperties) {
            const type = this.displayedProperties[name].property['@type'];

            if (this.imageProperty === null && type === 'ImageProperty') {
                this.imageProperty = name;
            } else if (this.videoProperty === null && type === 'VideoProperty') {
                this.videoProperty = name;
            }
        }
    }

}


