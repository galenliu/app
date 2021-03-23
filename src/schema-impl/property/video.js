/**
 * VideoDetail
 *
 * A bubble showing an video icon, which, when clicked, expands to a video
 * view.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


export default class VideoDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.label = property.title || name;


        this.dashHref = null;
        this.hlsHref = null;
        this.mjpegHref = null;
        this.player = null;

        for (const link of property.forms) {
            if (link.rel === 'alternate') {
                if (this.dashHref === null &&
                    link.mediaType === 'application/dash+xml') {
                    this.dashHref = link.href;
                } else if (this.hlsHref === null &&
                    link.mediaType === 'application/vnd.apple.mpegurl') {
                    this.hlsHref = link.href;
                } else if (this.mjpegHref === null &&
                    (link.mediaType === 'video/x-motion-jpeg' ||
                        link.mediaType === 'video/x-jpeg')) {
                    this.mjpegHref = link.href;
                }
            }
        }

        this.expandVideo = this._expandVideo.bind(this);
        this.positionButtons = this._positionButtons.bind(this);
    }

    /**
     * Attach to the view.
     */
    attach() {
    }

    /**
     * Build the detail view.
     */
    view() {
    }

    /**
     * Expand the video view.
     */
    _expandVideo() {
    }

    _positionButtons() {
    }
}


