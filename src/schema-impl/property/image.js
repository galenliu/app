/**
 * ImageDetail
 *
 * A bubble showing an image icon, which, when clicked, expands to an image
 * view.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


export default class ImageDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.label = property.title || name;


        this.imageHref = null;
        for (const link of property.links) {
            if (link.rel === 'alternate' && link.mediaType &&
                link.mediaType.startsWith('image/')) {
                this.imageHref = link.href;
                break;
            }
        }

        this.expandImage = this._expandImage.bind(this);
        this.reloadImage = this._reloadImage.bind(this);
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
     * Expand the image view.
     */
    _expandImage() {
    }

    _reloadImage() {

    }

    _positionButtons() {

    }
}


