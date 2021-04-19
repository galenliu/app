/**
 * NumericLabelDetail
 *
 * A bubble showing some basic numeric information with no input.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


import Units from "../../js/units";


export default class NumericLabelDetail {
    constructor(thing, name, readOnly, label, unit, precision) {
        this.thing = thing;
        this.name = name;
        this.readOnly = readOnly;
        this.label = label;
        this.unit = Units.nameToAbbreviation(unit);
        this.precision = precision;

    }

    attach() {

    }

    view() {
    }

    update(value) {
        if (!this.label) {
            return;
        }

        this.labelElement.value = parseFloat(value) || 0;
    }
}


