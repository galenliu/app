/**
 * BooleanDetail
 *
 * A generic boolean property detail.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


export default class BooleanDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title || name;

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
     * Update the detail view with the new property value.
     */
    update(bool) {

    }

    set() {

    }
}


