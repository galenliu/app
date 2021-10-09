/**
 * NumberDetail
 *
 * A generic numeric property detail.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

import Utils from "../../js/units"

export default class NumberDetail {
    constructor(thing, name, property) {
        this.thing = thing;
        this.name = name;
        this.readOnly = !!property.readOnly;
        this.label = property.title || name;
        this.type = property.type;
        this.unit =
            property.unit ? Utils.nameToAbbreviation(property.unit) : null;

        if (property.type === 'integer') {
            this.precision = 0;
        } else if (property.hasOwnProperty('multipleOf') &&
            `${property.multipleOf}`.includes('.')) {
            this.precision = `${property.multipleOf}`.split('.')[1].length;
        } else {
            this.precision = 3;
        }

        if (property.hasOwnProperty('minimum')) {
            this.min = property.minimum;
        } else {
            this.min = null;
        }

        if (property.hasOwnProperty('maximum')) {
            this.max = property.maximum;
        } else {
            this.max = null;
        }

        if (property.hasOwnProperty('multipleOf')) {
            this.step = property.multipleOf;
        } else if (property.type === 'number') {
            this.step = 'any';
        } else {
            this.step = 1;
        }


    }

    /**
     * Attach to the view.
     */
    attach() {
        this.input = this.thing.element.querySelector(`#${this.id}`);
        const setNumber = Utils.debounce(500, this.set.bind(this));
        this.input.addEventListener('change', setNumber);
    }

    /**
     * Build the detail view.
     */
    view() {
    }

    /**
     * Update the detail view with the new property value.
     */
    update(number) {
        if (!this.input) {
            return;
        }

        this.input.value = number;
    }

    set() {
        this.thing.setProperty(this.name, this.input.value);
    }
}


