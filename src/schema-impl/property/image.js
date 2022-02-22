


export default class ImageDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.label = property.title || name;
        this.id = `image-${Utils.escapeHtmlForIdClass(this.name)}`;

        this.imageHref = null;
        for (const form of property.forms) {
            if (form.contentType && form.contentType.startsWith('image/')) {
                this.imageHref = form.href;
                break;
            }
        }

        this.expandImage = this._expandImage.bind(this);
        this.reloadImage = this._reloadImage.bind(this);
        this.positionButtons = this._positionButtons.bind(this);
    }

}


