/**
 * ColorDetail
 *
 * A bubble showing the color of a thing
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


export default class ColorDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title;
        this.listViewData = {
            label: name,
            disabled: this.readOnly
        }
    }

    attach() {

    }

    view() {

    }

    update(color) {
        this.listViewData.state = color
    }

    set() {

    }
}

