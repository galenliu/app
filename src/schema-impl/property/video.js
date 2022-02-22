export default class VideoDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.label = property.title || name;
        this.id = `video-${Utils.escapeHtmlForIdClass(this.name)}`;

        this.dashHref = null;
        this.hlsHref = null;
        this.mjpegHref = null;
        this.player = null;

        for (const form of property.forms) {
            if (this.dashHref === null && form.contentType === 'application/dash+xml') {
                this.dashHref = form.href;
            } else if (this.hlsHref === null && form.contentType === 'application/vnd.apple.mpegurl') {
                this.hlsHref = form.href;
            } else if (
                this.mjpegHref === null &&
                (form.contentType === 'video/x-motion-jpeg' || form.contentType === 'video/x-jpeg')
            ) {
                this.mjpegHref = form.href;
            }
        }

        // this.expandVideo = this._expandVideo.bind(this);
        // this.positionButtons = this._positionButtons.bind(this);
    }

    /**
     * Attach to the view.
     */
    attach() {
        this.thing.element.querySelector(`#${this.id}`).addEventListener('click', this.expandVideo);
    }


}


